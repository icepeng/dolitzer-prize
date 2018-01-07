import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as UserAction from '../actions/user';
import * as fromUser from '../reducers';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private store: Store<fromUser.State>) {}

  getFromStoreOrApi(id: string) {
    return this.store.select(fromUser.getUserEntities).pipe(
      tap(entities => {
        if (!entities[id]) {
          this.store.dispatch(new UserAction.Load(id));
        }
        this.store.dispatch(new UserAction.Select(id));
      }),
      filter(entities => !!entities[id]),
      take(1),
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getFromStoreOrApi(route.params['userId']).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }
}
