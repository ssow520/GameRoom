import { User } from './user.model';
import { Game } from './game.model';

export interface Room {
    _id: string;
    name: string;
    game: string | Game;
    host: string | User;
    players: string[] | User[];
    status: 'waiting' | 'in_progress' | 'finished';
    maxPlayers: number;
    createdAt?: Date;
}