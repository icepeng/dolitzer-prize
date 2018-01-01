import { map } from 'rxjs/operators';
import { UserDetail, UserFromApi } from '../models/user';
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

  getUser(
    id: string,
  ): Observable<{ user: UserDetail; photos: Photo[]; likedPhotos: Photo[] }> {
    return this.http
      .get<UserFromApi>(`${this.appConfig.apiAddress}/users/${id}`)
      .pipe(
        map(user => {
          const userBase = {
            id: user.id,
            battletag: user.battletag,
          };
          const photos = user.photos.map(photo => ({
            ...photo,
            user: userBase,
          }));
          const likedPhotos = user.likedPhotos.map(photo => ({
            ...photo,
            user: userBase,
          }));
          const userDetail = {
            ...userBase,
            photoIds: photos.map(photo => photo.id),
            likedPhotoIds: likedPhotos.map(photo => photo.id),
          };
          return {
            user: userDetail,
            photos,
            likedPhotos,
          };
        }),
      );
  }
}
