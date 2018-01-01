import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared/shared.module';

import { reducers } from './reducers';
import { UserService } from './services/user.service';

@NgModule({
  imports: [SharedModule],
  declarations: [],
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
    StoreModule.forFeature('user', reducers),
    // EffectsModule.forFeature([]),
  ],
})
export class RootUserModule {}
