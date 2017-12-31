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

  inStore() {
    return this.store.select(fromAuth.getLoggedIn).pipe(take(1));
  }

  canActivate(): Observable<boolean> {
    return this.inStore().pipe(
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
