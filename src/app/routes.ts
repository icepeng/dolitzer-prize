import { Routes } from '@angular/router';

import { AuthGuard } from './auth/services/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: 'gallery',
    canActivate: [AuthGuard],
    loadChildren: './gallery/gallery.module#GalleryModule',
    data: { state: 'gallery' }
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    loadChildren: './history/history.module#HistoryModule',
    data: { state: 'history' }
  },
  {
    path: 'upload',
    canActivate: [AuthGuard],
    loadChildren: './upload/upload.module#UploadModule',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
