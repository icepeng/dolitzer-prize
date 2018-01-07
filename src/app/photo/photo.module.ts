import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared/shared.module';

import { PhotoFrameComponent } from './components/photo-frame.component';
import { PhotoListComponent } from './containers/photo-list.component';
import { PhotoViewerComponent } from './containers/photo-viewer.component';
import { PhotoEffects } from './effects/photo';
import { reducers } from './reducers';
import { PhotoGuard } from './services/photo-guard.service';
import { PhotoService } from './services/photo.service';
import { PhotoSortComponent } from './components/photo-sort.component';

@NgModule({
  imports: [SharedModule],
  exports: [PhotoListComponent, PhotoFrameComponent, PhotoViewerComponent, PhotoSortComponent],
  declarations: [PhotoListComponent, PhotoFrameComponent, PhotoViewerComponent, PhotoSortComponent],
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
