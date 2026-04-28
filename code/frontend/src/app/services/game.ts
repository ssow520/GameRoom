import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = `${environment.apiUrl}/games`;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  createGame(gameData: Partial<Game>): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, gameData);
  }

  updateGame(id: string, gameData: Partial<Game>): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}/${id}`, gameData);
  }

  deleteGame(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}