import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
} from '../actions/auth';
import { AuthService } from '../services/auth.service';
import * as PhotoAction from '../..//photo/actions/photo';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType(AuthActionTypes.Login)
    .pipe(
      map((action: Login) => action.payload),
      switchMap(token =>
        this.authService
          .decodeToken(token)
          .pipe(
            map(user => new LoginSuccess({ token, user })),
            catchError(err => of(new LoginFailure(err))),
          ),
      ),
    );

  @Effect()
  loginSuccess$ = this.actions$.ofType(AuthActionTypes.LoginSuccess).pipe(
    // tap(() => this.router.navigate(['/gallery'])),
    map(() => new PhotoAction.Load()),
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout)
    .pipe(tap(() => this.router.navigate(['/home'])));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
