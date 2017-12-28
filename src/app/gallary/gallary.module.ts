import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GallaryComponent } from './containers/gallary.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: GallaryComponent }]),
  ],
  declarations: [GallaryComponent],
  providers: [],
})
export class GallaryModule {}
