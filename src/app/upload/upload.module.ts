import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { UploadFormComponent } from './components/upload-form.component';
import { UploadComponent } from './containers/upload.component';
import { UploadEffects } from './effects/upload';
import { reducers } from './reducers';
import { UploadService } from './services/upload.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: UploadComponent }]),
    StoreModule.forFeature('upload', reducers),
    EffectsModule.forFeature([UploadEffects]),
  ],
  declarations: [UploadComponent, UploadFormComponent],
  providers: [UploadService],
})
export class UploadModule {}
