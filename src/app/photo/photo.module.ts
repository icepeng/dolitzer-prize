import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared/shared.module';

import { PhotoEffects } from './effects/photo';
import { reducers } from './reducers';
import { PhotoService } from './services/photo.service';

@NgModule({
  imports: [SharedModule],
})
export class PhotoModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootPhotoModule,
      providers: [PhotoService],
    };
  }
}

@NgModule({
  imports: [
    PhotoModule,
    StoreModule.forFeature('photo', reducers),
    EffectsModule.forFeature([PhotoEffects]),
  ],
})
export class RootPhotoModule {}
