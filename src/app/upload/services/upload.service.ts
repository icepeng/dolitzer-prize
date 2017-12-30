import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { _throw } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';

import { HttpAuth } from '../../auth/services/http-auth.service';
import { APP_CONFIG, AppConfig } from '../../config';
import { Upload } from '../models/upload';

@Injectable()
export class UploadService {
  constructor(
    private http: HttpAuth,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  submit(upload: Upload) {
    return this.http
      .post<{ id: number }>(`${this.appConfig.apiAddress}/photos`, upload)
      .pipe(map(res => res.id));
  }
}
