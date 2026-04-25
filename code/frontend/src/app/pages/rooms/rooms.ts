import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoomService } from '../../services/room';
import { GameService } from '../../services/game';
import { AuthService } from '../../services/auth';
import { SocketService } from '../../services/socket';
import { Room } from '../../models/room.model';
import { Game } from '../../models/game.model';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-rooms',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms implements OnInit, OnDestroy {
  rooms: Room[] = [];
  games: Game[] = [];
  error = '';
  showForm = false;
  notifications: string[] = [];
  currentUser: User | null = null;

  newRoom = {
    name: '',
    game: '',
    maxPlayers: 2
  };

  editingRoom: Room | null = null;

  private joinedSub!: Subscription;
  private startedSub!: Subscription;

  constructor(
    private roomService: RoomService,
    private gameService: GameService,
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.loadRooms();
    this.loadGames();
    this.socketService.connect();
    this.listenToSocket();
  }

  ngOnDestroy() {
    this.joinedSub?.unsubscribe();
    this.startedSub?.unsubscribe();
    this.socketService.disconnect();
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.cdr.detectChanges();
      },
      error: (err) => this.error = err.error?.error || 'Erreur de chargement'
    });
  }

  loadGames() {
    this.gameService.getAllGames().subscribe({
      next: (games) => {
        this.games = games;
        this.cdr.detectChanges();
      },
      error: (err) => this.error = err.error?.error || 'Erreur de chargement'
    });
  }

  createRoom() {
    this.roomService.createRoom(this.newRoom).subscribe({
      next: () => {
        this.loadRooms();
        this.showForm = false;
        this.newRoom = { name: '', game: '', maxPlayers: 2 };
      },
      error: (err) => this.error = err.error?.error || 'Erreur de création'
    });
  }

  deleteRoom(id: string) {
    this.roomService.deleteRoom(id).subscribe({
      next: () => this.loadRooms(),
      error: (err) => this.error = err.error?.error || 'Erreur de suppression'
    });
  }

  editRoom(room: Room) {
    this.editingRoom = { ...room };
  }

  updateRoom() {
    if (!this.editingRoom) return;
    this.roomService.updateRoom(this.editingRoom._id, this.editingRoom).subscribe({
      next: () => {
        this.loadRooms();
        this.editingRoom = null;
      },
      error: (err) => this.error = err.error?.error || 'Erreur de modification'
    });
  }

  joinRoom(roomId: string) {
    this.roomService.joinRoom(roomId).subscribe({
      next: () => {
        if (this.currentUser) {
          this.socketService.joinRoom(roomId, this.currentUser._id);
        }
        this.loadRooms();
      },
      error: (err) => this.error = err.error?.error || 'Erreur pour rejoindre'
    });
  }

  startRoom(roomId: string) {
    this.socketService.startRoom(roomId);
  }

  listenToSocket() {
    this.joinedSub = this.socketService.onRoomJoined().subscribe(data => {
      this.notifications.unshift(`Un joueur a rejoint la salle`);
      this.loadRooms();
    });

    this.startedSub = this.socketService.onRoomStarted().subscribe(data => {
      this.notifications.unshift(`La partie a commencé !`);
      this.loadRooms();
    });
  }

  isHost(room: Room): boolean {
    if (!this.currentUser) return false;
    const hostId = typeof room.host === 'string' ? room.host : room.host._id;
    return hostId === this.currentUser._id;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}