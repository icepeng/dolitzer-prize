import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import {
  Submit,
  SubmitFailure,
  SubmitSuccess,
  UploadActionTypes,
} from '../actions/upload';
import { UploadService } from '../services/upload.service';

@Injectable()
export class UploadEffects {
  @Effect()
  load$ = this.actions$
    .ofType(UploadActionTypes.Submit)
    .pipe(
      map((action: Submit) => action.payload),
      exhaustMap(payload =>
        this.uploadService
          .submit(payload.upload)
          .pipe(
            map(id => new SubmitSuccess({ id })),
            catchError(err => of(new SubmitFailure(err))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private uploadService: UploadService,
    private router: Router,
  ) {}
}
