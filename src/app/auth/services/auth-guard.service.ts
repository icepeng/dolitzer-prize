import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, take, tap } from 'rxjs/operators';

import * as Auth from '../actions/auth';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  inLocalStorage() {
    const localToken = localStorage.getItem('token');
    if (!localToken) {
      return of(false);
    }
    return of(localToken).pipe(
      tap(token => this.store.dispatch(new Auth.Login({ token }))),
      switchMap(() => this.store.select(fromAuth.getLoggedIn).pipe(take(1))),
    );
  }

  inStore() {
    return this.store.select(fromAuth.getLoggedIn).pipe(take(1));
  }

  isAuthed() {
    return this.inStore().pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.inLocalStorage();
      }),
    );
  }

  canActivate(): Observable<boolean> {
    return this.isAuthed().pipe(
      switchMap(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.LoginRedirect());
          return of(false);
        }
        return of(true);
      }),
    );
  }
}
