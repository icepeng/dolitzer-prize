import { appConfig } from '../../config';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPhoto from '../../photo/reducers';
import * as fromRoot from '../../reducers';
import * as fromGallery from './gallery';

export interface GalleryState {
  status: fromGallery.State;
}

export interface State extends fromRoot.State {
  gallery: GalleryState;
}

export const reducers = {
  status: fromGallery.reducer,
};

export const getGalleryState = createFeatureSelector<GalleryState>('gallery');

// Gallery

export const getGalleryStatusState = createSelector(
  getGalleryState,
  (state: GalleryState) => state.status,
);

export const getPage = createSelector(
  getGalleryStatusState,
  fromGallery.getPage,
);

export const getGalleryPhotos = createSelector(
  fromPhoto.getPhotoEntities,
  getGalleryStatusState,
  (entities, state) => state.photoIds.map(id => entities[id])
);

export const getGalleryPhotosTotal = createSelector(
  getGalleryPhotos,
  photos => photos.length,
);

export const getPagePhotos = createSelector(
  getGalleryPhotos,
  getPage,
  (photos, page) =>
    photos.slice((page - 1) * appConfig.perPage, page * appConfig.perPage),
);

// View

export const getIndex = createSelector(
  getGalleryPhotos,
  fromPhoto.getSelectedPhotoId,
  (photos, id) => {
    const index = photos.findIndex(photo => photo.id === id);
    if (index === -1) {
      return null;
    }
    return index;
  },
);

export const getNextId = createSelector(
  getGalleryPhotos,
  getIndex,
  (photos, index) => (photos[index + 1] ? photos[index + 1].id : null),
);

export const getPrevId = createSelector(
  getGalleryPhotos,
  getIndex,
  (photos, index) => (photos[index - 1] ? photos[index - 1].id : null),
);
