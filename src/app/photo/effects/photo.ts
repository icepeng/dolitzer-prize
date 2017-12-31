import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Load, LoadFailure, LoadOne, LoadSuccess, PhotoActionTypes } from '../actions/photo';
import { PhotoService } from '../services/photo.service';

@Injectable()
export class PhotoEffects {
  @Effect()
  load$ = this.actions$
    .ofType(PhotoActionTypes.Load)
    .pipe(
      map((action: Load) => action.payload),
      switchMap(payload =>
        this.photoService
          .getAll(payload)
          .pipe(
            map(photos => new LoadSuccess(photos)),
            catchError(err => of(new LoadFailure(err))),
          ),
      ),
    );

  @Effect()
  loadOne$ = this.actions$
    .ofType(PhotoActionTypes.LoadOne)
    .pipe(
      map((action: LoadOne) => action.payload),
      switchMap(payload =>
        this.photoService
          .getOne(payload)
          .pipe(
            map(photo => new LoadSuccess([photo])),
            catchError(err => of(new LoadFailure(err))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private photoService: PhotoService,
    private router: Router,
  ) {}
}
