import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared/shared.module';

import { PhotoModule } from '../photo/photo.module';
import { UserComponent } from './containers/user.component';
import { UserEffects } from './effects/user';
import { reducers } from './reducers';
import { UserService } from './services/user.service';

@NgModule({
  imports: [SharedModule, PhotoModule],
  declarations: [UserComponent],
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootUserModule,
      providers: [UserService],
    };
  }
}

@NgModule({
  imports: [
    UserModule,
    RouterModule.forChild([{ path: 'users/:id', component: UserComponent }]),
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class RootUserModule {}
