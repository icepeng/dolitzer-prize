import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { PhotoModule } from '../photo/photo.module';
import { PhotoGuard } from '../photo/services/photo-guard.service';
import { SharedModule } from '../shared/shared.module';
import { GalleryViewComponent } from './containers/gallery-view.component';
import { GalleryComponent } from './containers/gallery.component';
import { reducers } from './reducers';

@NgModule({
  imports: [
    SharedModule,
    PhotoModule,
    RouterModule.forChild([
      { path: '', component: GalleryComponent },
      {
        path: ':id',
        component: GalleryViewComponent,
        canActivate: [PhotoGuard],
      },
    ]),
    StoreModule.forFeature('gallery', reducers),
  ],
  declarations: [GalleryComponent, GalleryViewComponent],
  providers: [],
})
export class GalleryModule {}
