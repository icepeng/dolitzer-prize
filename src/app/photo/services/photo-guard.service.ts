import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import * as Photo from '../actions/photo';
import * as fromPhoto from '../reducers';

@Injectable()
export class PhotoGuard implements CanActivate {
  constructor(private store: Store<fromPhoto.State>) {}

  getFromStoreOrApi(id: number) {
    return this.store.select(fromPhoto.getPhotoEntities).pipe(
      tap(entities => {
        if (!entities[id]) {
          this.store.dispatch(new Photo.LoadOne(id));
        }
      }),
      filter(entities => !!entities[id]),
      take(1),
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getFromStoreOrApi(route.params['id']).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }
}
