import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  private serverUrl = environment.socketUrl;

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

  sendMessage(roomId: string, username: string, message: string): void {
    this.socket.emit('chat:message', { roomId, username, message });
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

  onChatMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('chat:message', (data) => {
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