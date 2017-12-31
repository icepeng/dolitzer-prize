import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { HttpAuth } from '../../auth/services/http-auth.service';
import { APP_CONFIG, AppConfig } from '../../config';
import { Period } from '../models/period';
import { Photo, PhotoFromApi } from '../models/photo';

@Injectable()
export class PhotoService {
  constructor(
    private http: HttpAuth,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getAll(params: Period): Observable<Photo[]> {
    const fromDate = new Date(params.year, params.month, 1).toISOString();
    const toDate = new Date(params.year, params.month + 1, 1).toISOString();
    return this.http
      .get<PhotoFromApi[]>(`${this.appConfig.apiAddress}/photos`, {
        params: {
          fromDate,
          toDate,
        },
      })
      .pipe(
        map(res =>
          res.map(x => ({
            ...x,
            period: params,
          })),
        ),
      );
  }

  getOne(id: number): Observable<Photo> {
    return this.http
      .get<PhotoFromApi>(`${this.appConfig.apiAddress}/photos/${id}`)
      .pipe(
        map(res => ({
          ...res,
          period: {
            month: new Date(res.createTime).getMonth(),
            year: new Date(res.createTime).getFullYear(),
          },
        })),
      );
  }
}
