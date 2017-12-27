import { Routes } from '@angular/router';

import { AuthGuard } from './auth/services/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: 'gallary',
    canActivate: [AuthGuard],
    loadChildren: './gallary/gallary.module#GallaryModule',
  },
  {
    path: 'upload',
    canActivate: [AuthGuard],
    loadChildren: './upload/upload.module#UploadModule',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
