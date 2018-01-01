import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromUser from '../reducers';
import * as UserAction from '../actions/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  battletag$ = this.store.select(fromUser.getSelectedUserBattletag);
  photos$ = this.store.select(fromUser.getSelectedUserPhotos);
  likedPhotos$ = this.store.select(fromUser.getSelectedUserLikedPhotos);

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromUser.UserState>,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.store.dispatch(new UserAction.Select(params['id'])),
    );
  }
}
