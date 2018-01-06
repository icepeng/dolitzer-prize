import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, take } from 'rxjs/operators';
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
  photo$ = this.store.select(fromPhoto.getSelectedPhoto);
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
    this.subscription$ = this.route.params.subscribe(params =>
      this.store.dispatch(new PhotoAction.Select(+params['id'])),
    );
    this.total$ = this.photoIds$.pipe(map(ids => ids.length));
    this.index$ = this.photoIds$.pipe(
      combineLatest(this.store.select(fromPhoto.getSelectedPhotoId)),
      map(([ids, selectedId]) => ids.findIndex(id => id === selectedId)),
    );
    this.liked$ = this.photo$.pipe(
      combineLatest(this.store.select(fromUser.getAuthedUserLikedPhotoIds)),
      map(
        ([photo, ids]) => (photo ? !!ids.find(id => photo.id === id) : false),
      ),
    );
  }

  prev() {
    this.photoIds$
      .pipe(
        combineLatest(this.index$),
        take(1),
        filter(([ids, index]) => index > 0),
        map(([ids, index]) => ids[index - 1]),
      )
      .subscribe(id =>
        this.router.navigate(['../', id], { relativeTo: this.route }),
      );
  }

  next() {
    this.photoIds$
      .pipe(
        combineLatest(this.index$),
        take(1),
        filter(([ids, index]) => index < ids.length),
        map(([ids, index]) => ids[index + 1]),
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

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
