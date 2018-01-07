import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { ManualComponent } from './manual/manual.component';

export const appRoutes: Routes = [
  {
    path: 'history',
    canActivate: [AuthGuard],
    loadChildren: './history/history.module#HistoryModule',
    data: { state: 'history' },
  },
  {
    path: 'upload',
    canActivate: [AuthGuard],
    loadChildren: './upload/upload.module#UploadModule',
  },
  {
    path: 'manual',
    component: ManualComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
