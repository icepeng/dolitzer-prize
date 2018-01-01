import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserPhotosComponent } from './containers/user-photos.component';
import { UserLikedPhotosComponent } from './containers/user-liked-photos.component';

@NgModule({
  imports: [SharedModule],
  declarations: [UserPhotosComponent, UserLikedPhotosComponent],
})
export class UserModule {}
