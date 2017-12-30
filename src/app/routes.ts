import { Routes } from '@angular/router';

import { AuthGuard } from './auth/services/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: 'gallery',
    canActivate: [AuthGuard],
    loadChildren: './gallery/gallery.module#GalleryModule',
  },
  {
    path: 'upload',
    canActivate: [AuthGuard],
    loadChildren: './upload/upload.module#UploadModule',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
