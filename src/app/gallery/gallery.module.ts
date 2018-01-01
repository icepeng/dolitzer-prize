import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthGuard } from '../auth/services/auth-guard.service';
import { PhotoModule } from '../photo/photo.module';
import { PhotoGuard } from '../photo/services/photo-guard.service';
import { SharedModule } from '../shared/shared.module';
import { GalleryViewComponent } from './containers/gallery-view.component';
import { GalleryComponent } from './containers/gallery.component';
import { GalleryEffects } from './effects/gallery';
import { reducers } from './reducers';

@NgModule({
  imports: [SharedModule, PhotoModule],
  declarations: [GalleryComponent, GalleryViewComponent],
})
export class GalleryModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootGalleryModule,
    };
  }
}

@NgModule({
  imports: [
    GalleryModule,
    RouterModule.forChild([
      {
        path: 'gallery',
        canActivate: [AuthGuard],
        children: [
          { path: '', component: GalleryComponent },
          {
            path: ':id',
            component: GalleryViewComponent,
            canActivate: [PhotoGuard],
          },
        ],
      },
    ]),
    StoreModule.forFeature('gallery', reducers),
    EffectsModule.forFeature([GalleryEffects]),
  ],
})
export class RootGalleryModule {}
