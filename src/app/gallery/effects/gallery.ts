import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { PhotoService } from '../../photo/services/photo.service';
import {
  GalleryActionTypes,
  LoadFailure,
  LoadSuccess,
} from '../actions/gallery';

@Injectable()
export class GalleryEffects {
  @Effect()
  load$ = this.actions$.ofType(GalleryActionTypes.Load).pipe(
    switchMap(() =>
      this.photoService
        .getAll({
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        })
        .pipe(
          map(photos => new LoadSuccess(photos)),
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
