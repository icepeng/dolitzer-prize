import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';

import { ImgurResponse } from '../models/imgur';

@Injectable()
export class ImgurService {
  constructor(private http: HttpClient) {}

  upload(image: File) {
    // TODO: set accessToken for Imgur, interceptor 어떻게 잘 처리해보자
    return this.http
      .post<ImgurResponse>(`https://api.imgur.com/3/image`, { image })
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            return _throw(err.error.message);
          }
          return _throw(err);
        }),
      );
  }
}
