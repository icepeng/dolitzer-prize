import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  ImageActionTypes,
  Upload,
  UploadFailure,
  UploadSuccess,
} from '../actions/image';
import { ImageService } from '../services/image.service';

@Injectable()
export class ImageEffects {
  @Effect()
  load$ = this.actions$
    .ofType(ImageActionTypes.Upload)
    .pipe(
      map((action: Upload) => action.payload),
      switchMap(payload =>
        this.imageService
          .upload(payload)
          .pipe(
            map(res => new UploadSuccess(res)),
            catchError(err => of(new UploadFailure(err))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private imageService: ImageService,
    private router: Router,
  ) {}
}
