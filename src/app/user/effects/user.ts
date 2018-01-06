import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  Load,
  LoadFailure,
  LoadSuccess,
  UserActionTypes,
} from '../actions/user';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  @Effect()
  load$ = this.actions$
    .ofType(UserActionTypes.Load)
    .pipe(
      map((action: Load) => action.payload),
      switchMap(payload =>
        this.userService
          .getUser(payload)
          .pipe(
            map(user => new LoadSuccess(user)),
            catchError(err => of(new LoadFailure(err))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ) {}
}
