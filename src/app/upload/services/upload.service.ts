import { _throw } from 'rxjs/observable/throw';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { APP_CONFIG, AppConfig } from '../../config';
import { Upload } from '../models/upload';

@Injectable()
export class UploadService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  submit(upload: Upload) {
    return this.http
      .post<{ id: number }>(`${this.appConfig.apiAddress}/photos`, upload)
      .pipe(
        map(res => res.id),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            return _throw(err.error.message);
          }
          return _throw(err);
        }),
      );
  }
}
