import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../reducers';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromAuth.AuthState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.store.select(fromAuth.getToken).pipe(
      map(token =>
        request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ),
      switchMap(req => next.handle(req)),
    );
  }
}
