import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  CancelLike,
  CancelLikeFailure,
  CancelLikeSuccess,
  Like,
  LikeActionTypes,
  LikeFailure,
  LikeSuccess,
} from '../actions/like';
import {
  LoadFailure,
  LoadOne,
  LoadSuccess,
  PhotoActionTypes,
} from '../actions/photo';
import { PhotoService } from '../services/photo.service';

@Injectable()
export class PhotoEffects {
  @Effect()
  loadOne$ = this.actions$
    .ofType(
      PhotoActionTypes.LoadOne,
      LikeActionTypes.LikeSuccess,
      LikeActionTypes.CancelLikeSuccess,
    )
    .pipe(
      map((action: LoadOne | LikeSuccess) => action.payload),
      switchMap(payload =>
        this.photoService
          .getOne(payload)
          .pipe(
            map(photo => new LoadSuccess(photo)),
            catchError(err => of(new LoadFailure(err))),
          ),
      ),
    );

  @Effect()
  like$ = this.actions$
    .ofType(LikeActionTypes.Like)
    .pipe(
      map((action: Like) => action.payload),
      switchMap(payload =>
        this.photoService
          .like(payload)
          .pipe(
            map(() => new LikeSuccess(payload)),
            catchError(err => of(new LikeFailure(err))),
          ),
      ),
    );

  @Effect()
  cancelLike$ = this.actions$
    .ofType(LikeActionTypes.CancelLike)
    .pipe(
      map((action: CancelLike) => action.payload),
      switchMap(payload =>
        this.photoService
          .cancelLike(payload)
          .pipe(
            map(() => new CancelLikeSuccess(payload)),
            catchError(err => of(new CancelLikeFailure(err))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private photoService: PhotoService,
    private router: Router,
  ) {}
}
