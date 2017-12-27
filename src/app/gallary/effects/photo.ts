import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { LoadFailure, LoadSuccess, PhotoActionTypes } from '../actions/photo';
import { PhotoService } from '../services/photo.service';

@Injectable()
export class PhotoEffects {
  @Effect()
  load$ = this.actions$
    .ofType(PhotoActionTypes.Load)
    .pipe(
      exhaustMap(() =>
        this.photoService
          .getAll()
          .pipe(
            map(photos => new LoadSuccess({ photos })),
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
