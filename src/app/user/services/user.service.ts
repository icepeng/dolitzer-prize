import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpAuth } from '../../auth/services/http-auth.service';
import { APP_CONFIG, AppConfig } from '../../config';
import { Photo } from '../../photo/models/photo';

@Injectable()
export class UserService {
  constructor(
    private http: HttpAuth,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  getPhotos(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(
      `${this.appConfig.apiAddress}/users/${id}/photos`,
    );
  }

  getLikedPhotos(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(
      `${this.appConfig.apiAddress}/users/${id}/liked-photos`,
    );
  }
}
