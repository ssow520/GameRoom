import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/game';
import { AuthService } from '../../services/auth';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-games',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './games.html',
  styleUrl: './games.scss',
})
export class Games implements OnInit {
  games: Game[] = [];
  error = '';
  showForm = false;

  newGame = {
    title: '',
    description: '',
    category: 'autre',
    maximumPlayers: 2,
    minimumPlayers: 2
  };

  editingGame: Game | null = null;

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadGames();
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

  createGame() {
    this.gameService.createGame(this.newGame).subscribe({
      next: () => {
        this.loadGames();
        this.showForm = false;
        this.newGame = { title: '', description: '', category: 'autre', maximumPlayers: 2, minimumPlayers: 2 };
      },
      error: (err) => this.error = err.error?.error || 'Erreur de création'
    });
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id).subscribe({
      next: () => this.loadGames(),
      error: (err) => this.error = err.error?.error || 'Erreur de suppression'
    });
  }

  editGame(game: Game) {
    this.editingGame = { ...game };
  }

  updateGame() {
    if (!this.editingGame) return;
    this.gameService.updateGame(this.editingGame._id, this.editingGame).subscribe({
      next: () => {
        this.loadGames();
        this.editingGame = null;
      },
      error: (err) => this.error = err.error?.error || 'Erreur de modification'
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}