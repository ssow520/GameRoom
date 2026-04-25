import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  private serverUrl = 'http://localhost:5001';

  connect(): void {
    if (!this.socket || !this.socket.connected) {
      this.socket = io(this.serverUrl);
    }
  }

  joinRoom(roomId: string, userId: string): void {
    this.socket.emit('room:join', { roomId, userId });
  }

  startRoom(roomId: string): void {
    this.socket.emit('room:start', { roomId });
  }

  onRoomJoined(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('room:joined', (data) => {
        observer.next(data);
      });
    });
  }

  onRoomStarted(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('room:started', (data) => {
        observer.next(data);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}