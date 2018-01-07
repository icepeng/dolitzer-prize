import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromUser from '../reducers';

@Component({
  selector: 'app-user-photos-view',
  templateUrl: './user-photos-view.component.html',
  styleUrls: ['./user-photos-view.component.scss'],
})
export class UserPhotosViewComponent implements OnInit {
  battletag$ = this.store.select(fromUser.getSelectedUserBattletag);
  photoIds$ = this.store.select(fromUser.getSelectedUserPhotoIds);
  sortColumn$ = this.store.select(fromUser.getSelectedUserPhotoListSortColumn);
  sortOrder$ = this.store.select(fromUser.getSelectedUserPhotoListSortOrder);

  constructor(private store: Store<fromUser.State>) {}

  ngOnInit() {}
}
