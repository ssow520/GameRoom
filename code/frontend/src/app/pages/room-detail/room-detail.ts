import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room';
import { AuthService } from '../../services/auth';
import { SocketService } from '../../services/socket';
import { Room } from '../../models/room.model';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { Navbar } from '../../components/navbar/navbar';

interface ChatMessage {
  username: string;
  message: string;
  timestamp: string;
}

@Component({
  selector: 'app-room-detail',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './room-detail.html',
  styleUrl: './room-detail.scss',
})
export class RoomDetail implements OnInit, OnDestroy {
  room: Room | null = null;
  currentUser: User | null = null;
  messages: ChatMessage[] = [];
  newMessage = '';
  error = '';

  private joinedSub!: Subscription;
  private startedSub!: Subscription;
  private chatSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private authService: AuthService,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.loadRoom(roomId);
      this.socketService.connect();
      if (this.currentUser) {
        this.socketService.joinRoom(roomId, this.currentUser._id);
      }
      this.listenToSocket();
    }
  }

  ngOnDestroy() {
    this.joinedSub?.unsubscribe();
    this.startedSub?.unsubscribe();
    this.chatSub?.unsubscribe();
    this.socketService.disconnect();
  }

  loadRoom(roomId: string) {
    this.roomService.getRoomById(roomId).subscribe({
      next: (room) => {
        this.room = room;
        this.cdr.detectChanges();
      },
      error: (err) => this.error = err.error?.error || 'Erreur de chargement'
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.room || !this.currentUser) return;
    this.socketService.sendMessage(this.room._id, this.currentUser.username, this.newMessage);
    this.newMessage = '';
  }

  startRoom() {
    if (!this.room) return;
    this.socketService.startRoom(this.room._id);
  }

  listenToSocket() {
    this.joinedSub = this.socketService.onRoomJoined().subscribe(data => {
      if (this.room) this.loadRoom(this.room._id);
    });

    this.startedSub = this.socketService.onRoomStarted().subscribe(data => {
      if (this.room) this.loadRoom(this.room._id);
    });

    this.chatSub = this.socketService.onChatMessage().subscribe((data: ChatMessage) => {
      this.messages.push(data);
      this.cdr.detectChanges();
    });
  }

  isHost(): boolean {
    if (!this.currentUser || !this.room) return false;
    const hostId = typeof this.room.host === 'string' ? this.room.host : this.room.host._id;
    return hostId === this.currentUser._id;
  }

  goBack() {
    this.router.navigate(['/rooms']);
  }
}