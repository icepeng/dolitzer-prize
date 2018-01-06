import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared/shared.module';

import { AuthGuard } from '../auth/services/auth-guard.service';
import { PhotoModule } from '../photo/photo.module';
import { UserLikedPhotosViewComponent } from './containers/user-liked-photos-view.component';
import { UserPhotosViewComponent } from './containers/user-photos-view.component';
import { UserComponent } from './containers/user.component';
import { UserEffects } from './effects/user';
import { reducers } from './reducers';
import { UserGuard } from './services/user-guard.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [SharedModule, PhotoModule],
  declarations: [
    UserComponent,
    UserPhotosViewComponent,
    UserLikedPhotosViewComponent,
  ],
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootUserModule,
      providers: [UserService, UserGuard],
    };
  }
}

@NgModule({
  imports: [
    UserModule,
    RouterModule.forChild([
      {
        path: 'users',
        canActivate: [AuthGuard],
        children: [
          { path: ':userId', component: UserComponent },
          {
            path: ':userId/photos/:id',
            component: UserPhotosViewComponent,
            canActivate: [UserGuard],
          },
          {
            path: ':userId/liked-photos/:id',
            component: UserLikedPhotosViewComponent,
            canActivate: [UserGuard],
          },
        ],
      },
    ]),
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class RootUserModule {}
