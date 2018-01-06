import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { UserService } from '../../user/services/user.service';
import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
} from '../actions/auth';
import * as UserAction from '../../user/actions/user';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.ofType(AuthActionTypes.Login).pipe(
    switchMap(async () => {
      try {
        const token = await this.authService.login();
        const decoded = this.authService.decodeToken(token);
        return new LoginSuccess({ token, decoded });
      } catch (err) {
        return new LoginFailure(err);
      }
    }),
  );

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(AuthActionTypes.LoginSuccess)
    .pipe(
      map((action: LoginSuccess) => action.payload),
      map(({ decoded }) => new UserAction.Load(decoded.id)),
    );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout)
    .pipe(tap(() => this.router.navigate(['/home'])));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}
}
