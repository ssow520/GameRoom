import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
  { path: 'games', loadComponent: () => import('./pages/games/games').then(m => m.Games), canActivate: [authGuard] },
  { path: 'rooms', loadComponent: () => import('./pages/rooms/rooms').then(m => m.Rooms), canActivate: [authGuard] },
  { path: 'rooms/:id', loadComponent: () => import('./pages/room-detail/room-detail').then(m => m.RoomDetail), canActivate: [authGuard] },
];