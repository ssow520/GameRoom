import { User } from './user.model';

export interface Game {
    _id: string;
    title: string;
    description?: string;
    category: string;
    maximumPlayers: number;
    minimumPlayers: number;
    creator: string | User;
    createdAt?: Date;
}