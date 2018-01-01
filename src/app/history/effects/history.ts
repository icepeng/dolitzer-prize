import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PhotoService } from '../../photo/services/photo.service';
import {
  HistoryActionTypes,
  Load,
  LoadFailure,
  LoadSuccess,
} from '../actions/history';

@Injectable()
export class HistoryEffects {
  @Effect()
  load$ = this.actions$
    .ofType(HistoryActionTypes.Load)
    .pipe(
      map((action: Load) => action.payload),
      switchMap(period =>
        this.photoService
          .getAll(period)
          .pipe(
            map(photos => new LoadSuccess({ period, photos })),
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
