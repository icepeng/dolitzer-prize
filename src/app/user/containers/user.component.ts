import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { Photo } from '../../photo/models/photo';
import * as fromPhoto from '../../photo/reducers';
import * as UserAction from '../actions/user';
import * as fromUser from '../reducers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  battletag$ = this.store.select(fromUser.getSelectedUserBattletag);
  photos$: Observable<Photo[]>;
  likedPhotos$: Observable<Photo[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromUser.UserState>,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.store.dispatch(new UserAction.Select(params['userId'])),
    );

    this.photos$ = combineLatest(
      this.store.select(fromUser.getSelectedUserPhotoIds),
      this.store.select(fromPhoto.getPhotoEntities),
    ).pipe(map(([ids, entities]) => (ids ? ids.map(id => entities[id]) : [])));

    this.likedPhotos$ = combineLatest(
      this.store.select(fromUser.getSelectedUserLikedPhotoIds),
      this.store.select(fromPhoto.getPhotoEntities),
    ).pipe(map(([ids, entities]) => (ids ? ids.map(id => entities[id]) : [])));
  }

  onPhotoSelect(photo: Photo) {
    this.router.navigate(['./', 'photos', photo.id], {
      relativeTo: this.route,
    });
  }

  onLikedPhotoSelect(photo: Photo) {
    this.router.navigate(['./', 'liked-photos', photo.id], {
      relativeTo: this.route,
    });
  }
}
