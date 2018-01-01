import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
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
    .ofType(PhotoActionTypes.LoadOne)
    .pipe(
      map((action: LoadOne) => action.payload),
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
            map(photo => new LikeSuccess(payload)),
            catchError(err => of(new LikeFailure(err))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private photoService: PhotoService,
    private router: Router,
  ) {}
}
