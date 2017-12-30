import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import * as fromAuth from '../../auth/reducers';

const HEADER_NAME = 'Authorization';
const HEADER_PREFIX = 'Bearer ';

interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
}

@Injectable()
export class HttpAuth {
  token$ = this.store.select(fromAuth.getToken);

  constructor(private http: HttpClient, private store: Store<fromAuth.State>) {}

  headerHelper(options: HttpOptions) {
    const headers =
      options.headers instanceof HttpHeaders
        ? options.headers
        : new HttpHeaders(options.headers || {});
    return this.token$.pipe(
      map(token => ({
        ...options,
        headers: headers.append(HEADER_NAME, HEADER_PREFIX + token),
      })),
    );
  }

  get<T>(url: string, options: HttpOptions = {}): Observable<T> {
    return this.headerHelper(options).pipe(
      switchMap(authOptions => this.http.get<T>(url, authOptions)),
    );
  }

  post<T>(url: string, body: any, options: HttpOptions = {}): Observable<T> {
    return this.headerHelper(options).pipe(
      switchMap(authOptions => this.http.post<T>(url, body, authOptions)),
    );
  }

  put<T>(url: string, body: any, options: HttpOptions = {}): Observable<T> {
    return this.headerHelper(options).pipe(
      switchMap(authOptions => this.http.put<T>(url, body, authOptions)),
    );
  }

  delete<T>(url: string, options: HttpOptions = {}): Observable<T> {
    return this.headerHelper(options).pipe(
      switchMap(authOptions => this.http.delete<T>(url, authOptions)),
    );
  }
}
