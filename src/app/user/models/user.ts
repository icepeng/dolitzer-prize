import { Photo } from '../../photo/models/photo';
export interface User {
  battletag: string;
  id: string;
}

export interface UserDetail extends User {
  photoIds: number[];
  likedPhotoIds: number[];
}

export interface UserFromApi extends User {
  photos: Photo[];
  likedPhotos: Photo[];
}
