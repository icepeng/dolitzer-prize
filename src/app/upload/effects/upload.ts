import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as GalleryAction from '../../gallery/actions/gallery';
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
  submit$ = this.actions$
    .ofType(UploadActionTypes.Submit)
    .pipe(
      map((action: Submit) => action.payload),
      switchMap(payload =>
        this.uploadService
          .submit(payload)
          .pipe(
            map(id => new SubmitSuccess(id)),
            catchError(err => of(new SubmitFailure(err))),
          ),
      ),
    );

  @Effect()
  submitSucess$ = this.actions$
    .ofType(UploadActionTypes.SubmitSuccess)
    .pipe(
      tap(() => this.router.navigate(['/', 'gallery'])),
      map(() => new GalleryAction.Load()),
    );

  constructor(
    private actions$: Actions,
    private uploadService: UploadService,
    private router: Router,
  ) {}
}
