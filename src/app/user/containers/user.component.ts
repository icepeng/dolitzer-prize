import { APP_CONFIG, AppConfig } from '../../config';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, take } from 'rxjs/operators';

import { Photo } from '../../photo/models/photo';
import * as fromPhoto from '../../photo/reducers';
import * as UserAction from '../actions/user';
import * as fromUser from '../reducers';
import * as PhotoAction from '../actions/photo';
import * as LikedPhotoAction from '../actions/liked-photo';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  battletag$ = this.store.select(fromUser.getSelectedUserBattletag);
  perPage = this.appConfig.perPage;

  page$ = this.store.select(fromUser.getSelectedUserPhotoListPage);
  sortColumn$ = this.store.select(fromUser.getSelectedUserPhotoListSortColumn);
  sortOrder$ = this.store.select(fromUser.getSelectedUserPhotoListSortOrder);
  photoIds$ = this.store.select(fromUser.getSelectedUserPhotoIds);
  total$ = this.store.select(fromUser.getSelectedUserPhotoTotal);

  likedPage$ = this.store.select(fromUser.getSelectedUserLikedPhotoListPage);
  likedSortColumn$ = this.store.select(
    fromUser.getSelectedUserLikedPhotoListSortColumn,
  );
  likedSortOrder$ = this.store.select(
    fromUser.getSelectedUserLikedPhotoListSortOrder,
  );
  likedPhotoIds$ = this.store.select(fromUser.getSelectedUserLikedPhotoIds);
  likedTotal$ = this.store.select(fromUser.getSelectedUserLikedPhotoTotal);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromUser.UserState>,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  ngOnInit() {}

  onSelect(photo: Photo) {
    this.router.navigate(['./', 'photos', photo.id], {
      relativeTo: this.route,
    });
  }

  onLikedSelect(photo: Photo) {
    this.router.navigate(['./', 'liked-photos', photo.id], {
      relativeTo: this.route,
    });
  }

  next() {
    this.store
      .select(fromUser.getSelectedUserId)
      .pipe(take(1))
      .subscribe((id: string) =>
        this.store.dispatch(new PhotoAction.NextPage(id)),
      );
  }

  prev() {
    this.store
      .select(fromUser.getSelectedUserId)
      .pipe(take(1))
      .subscribe((id: string) =>
        this.store.dispatch(new PhotoAction.PrevPage(id)),
      );
  }

  onSortChange(sort: any) {
    this.store
      .select(fromUser.getSelectedUserId)
      .pipe(take(1))
      .subscribe((id: string) =>
        this.store.dispatch(new PhotoAction.Sort({ id, ...sort })),
      );
  }

  likedNext() {
    this.store
      .select(fromUser.getSelectedUserId)
      .pipe(take(1))
      .subscribe((id: string) =>
        this.store.dispatch(new LikedPhotoAction.NextPage(id)),
      );
  }

  likedPrev() {
    this.store
      .select(fromUser.getSelectedUserId)
      .pipe(take(1))
      .subscribe((id: string) =>
        this.store.dispatch(new LikedPhotoAction.PrevPage(id)),
      );
  }

  onLikedSortChange(sort: any) {
    this.store
      .select(fromUser.getSelectedUserId)
      .pipe(take(1))
      .subscribe((id: string) =>
        this.store.dispatch(new LikedPhotoAction.Sort({ id, ...sort })),
      );
  }
}
