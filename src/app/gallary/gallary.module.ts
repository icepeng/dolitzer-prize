import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { GallaryComponent } from './containers/gallary.component';
import { PhotoEffects } from './effects/photo';
import { reducers } from './reducers';
import { PhotoService } from './services/photo.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: GallaryComponent }]),
    StoreModule.forFeature('gallary', reducers),
    EffectsModule.forFeature([PhotoEffects]),
  ],
  declarations: [GallaryComponent],
  providers: [PhotoService],
})
export class GallaryModule {}
