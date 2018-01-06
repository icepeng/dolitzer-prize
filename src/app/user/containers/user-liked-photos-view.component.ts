import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromUser from '../reducers';

@Component({
  selector: 'app-user-liked-photos-view',
  templateUrl: './user-liked-photos-view.component.html',
  styleUrls: ['./user-liked-photos-view.component.scss'],
})
export class UserLikedPhotosViewComponent implements OnInit {
  battletag$ = this.store.select(fromUser.getSelectedUserBattletag);
  photoIds$ = this.store.select(fromUser.getSelectedUserLikedPhotoIds);

  constructor(private store: Store<fromUser.State>) {}

  ngOnInit() {}
}
