import { ImgurService } from '../services/imgur.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import {
  Upload,
  UploadFailure,
  UploadSuccess,
  ImgurActionTypes,
} from '../actions/imgur';

@Injectable()
export class ImgurEffects {
  @Effect()
  load$ = this.actions$
    .ofType(ImgurActionTypes.Upload)
    .pipe(
      map((action: Upload) => action.payload),
      exhaustMap(payload =>
        this.imgurService
          .upload(payload.image)
          .pipe(
            map(res => new UploadSuccess(res)),
            catchError(err => of(new UploadFailure(err))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private imgurService: ImgurService,
    private router: Router,
  ) {}
}
