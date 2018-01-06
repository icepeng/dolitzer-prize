import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared/shared.module';

import { PhotoListComponent } from './components/photo-list.component';
import { PhotoEffects } from './effects/photo';
import { reducers } from './reducers';
import { PhotoGuard } from './services/photo-guard.service';
import { PhotoService } from './services/photo.service';
import { PhotoFrameComponent } from './components/photo-frame.component';
import { PhotoViewerComponent } from './containers/photo-viewer.component';

@NgModule({
  imports: [SharedModule],
  exports: [PhotoListComponent, PhotoFrameComponent, PhotoViewerComponent],
  declarations: [PhotoListComponent, PhotoFrameComponent, PhotoViewerComponent],
})
export class PhotoModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootPhotoModule,
      providers: [PhotoService, PhotoGuard],
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
