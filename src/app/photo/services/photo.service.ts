import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import * as fromAuth from '../../auth/reducers';
import { HttpAuth } from '../../auth/services/http-auth.service';
import { APP_CONFIG, AppConfig } from '../../config';
import { Period } from '../models/period';
import { Photo } from '../models/photo';

@Injectable()
export class PhotoService {
  constructor(
    private http: HttpAuth,
    private store: Store<fromAuth.AuthState>,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getAll(params: Period): Observable<Photo[]> {
    const fromDate = new Date(params.year, params.month, 1).toISOString();
    const toDate = new Date(params.year, params.month + 1, 1).toISOString();
    return this.http.get<Photo[]>(`${this.appConfig.apiAddress}/photos`, {
      params: {
        fromDate,
        toDate,
      },
    });
  }

  getOne(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.appConfig.apiAddress}/photos/${id}`);
  }

  like(id: number) {
    return this.store.select(fromAuth.getUser).pipe(
      take(1),
      map(user =>
        this.http.post(
          `${this.appConfig.apiAddress}/users/${user.id}/liked-photos`,
          {
            id,
          },
        ),
      ),
    );
  }
}
