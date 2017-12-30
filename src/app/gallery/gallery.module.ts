import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { PhotoModule } from '../photo/photo.module';
import { SharedModule } from '../shared/shared.module';
import { GalleryComponent } from './containers/gallery.component';
import { reducers } from './reducers';

@NgModule({
  imports: [
    SharedModule,
    PhotoModule,
    RouterModule.forChild([{ path: '', component: GalleryComponent }]),
    StoreModule.forFeature('gallery', reducers),
  ],
  declarations: [GalleryComponent],
  providers: [],
})
export class GalleryModule {}
