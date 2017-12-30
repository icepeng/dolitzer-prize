import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared/shared.module';

import { PhotoEffects } from './effects/photo';
import { reducers } from './reducers';
import { PhotoService } from './services/photo.service';
import { PhotoViewComponent } from './components/photo-view.component';
import { PhotoListComponent } from './components/photo-list.component';

@NgModule({
  imports: [SharedModule],
  exports: [PhotoViewComponent, PhotoListComponent],
  declarations: [PhotoViewComponent, PhotoListComponent],
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
