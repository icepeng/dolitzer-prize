import { Photo } from '../models/photo';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  take,
} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs/Rx';

import * as PhotoLikeAction from '../actions/like';
import * as PhotoAction from '../actions/photo';
import * as fromPhoto from '../reducers';
import * as fromUser from '../../user/reducers';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss'],
})
export class PhotoViewerComponent implements OnInit, OnDestroy {
  @Input() photoIds$: Observable<number[]>;
  @Input() sortColumn$: Observable<keyof Photo>;
  @Input() sortOrder$: Observable<'ASC' | 'DESC'>;
  photo$ = this.store.select(fromPhoto.getSelectedPhoto);
  sortedPhotos$: Observable<Photo[]>;
  index$: Observable<number>;
  liked$: Observable<boolean>;
  total$: Observable<number>;
  subscription$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromPhoto.State>,
  ) {}

  ngOnInit() {
    this.sortedPhotos$ = this.store
      .select(fromPhoto.getPhotoEntities)
      .pipe(
        combineLatest(this.photoIds$, this.sortColumn$, this.sortOrder$),
        distinctUntilChanged(),
        map(([entities, ids, sortColumn, sortOrder]) =>
          ids
            .map(id => entities[id])
            .sort(this.sortFunc(sortColumn, sortOrder)),
        ),
      );

    this.subscription$ = this.route.params.subscribe(params =>
      this.store.dispatch(new PhotoAction.Select(+params['id'])),
    );

    this.total$ = this.photoIds$.pipe(map(ids => ids.length));

    this.index$ = this.sortedPhotos$.pipe(
      combineLatest(this.store.select(fromPhoto.getSelectedPhotoId)),
      map(([photos, id]) => photos.findIndex(photo => photo.id === id)),
    );

    this.liked$ = this.photo$.pipe(
      combineLatest(this.store.select(fromUser.getAuthedUserLikedPhotoIds)),
      map(
        ([photo, ids]) => (photo ? !!ids.find(id => photo.id === id) : false),
      ),
    );
  }

  prev() {
    this.sortedPhotos$
      .pipe(
        combineLatest(this.index$),
        take(1),
        filter(([photos, index]) => index > 0),
        map(([photos, index]) => photos[index - 1].id),
      )
      .subscribe(id =>
        this.router.navigate(['../', id], { relativeTo: this.route }),
      );
  }

  next() {
    this.sortedPhotos$
      .pipe(
        combineLatest(this.index$),
        take(1),
        filter(([photos, index]) => index < photos.length),
        map(([photos, index]) => photos[index + 1].id),
      )
      .subscribe(id =>
        this.router.navigate(['../', id], { relativeTo: this.route }),
      );
  }

  like() {
    this.store
      .select(fromPhoto.getSelectedPhotoId)
      .pipe(combineLatest(this.liked$), take(1))
      .subscribe(
        ([id, liked]: [number, boolean]) =>
          liked
            ? this.store.dispatch(new PhotoLikeAction.CancelLike(id))
            : this.store.dispatch(new PhotoLikeAction.Like(id)),
      );
  }

  random() {
    this.photoIds$
      .pipe(
        combineLatest(this.total$),
        take(1),
        map(([ids, total]) => ids[Math.floor(Math.random() * total)]),
      )
      .subscribe(id =>
        this.router.navigate(['../', id], { relativeTo: this.route }),
      );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  sortFunc = (sortColumn: keyof Photo, sortOrder: 'ASC' | 'DESC') => (
    a: Photo,
    b: Photo,
  ) => {
    if (a[sortColumn] > b[sortColumn]) {
      return sortOrder === 'ASC' ? 1 : -1;
    }
    if (a[sortColumn] < b[sortColumn]) {
      return sortOrder === 'DESC' ? 1 : -1;
    }
    if (a.createTime > b.createTime) {
      return sortOrder === 'ASC' ? 1 : -1;
    }
    if (a.createTime < b.createTime) {
      return sortOrder === 'DESC' ? 1 : -1;
    }
    return 0;
  };
}
