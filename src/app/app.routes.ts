import { Routes } from '@angular/router';

export const APP_BASE_ROUTES: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  { path: '**', redirectTo: 'error/not-found', pathMatch: 'full' },
];
