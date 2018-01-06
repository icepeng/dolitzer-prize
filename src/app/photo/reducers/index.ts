import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromPhoto from './photo';
import * as fromUser from '../../user/reducers';

export interface PhotoState {
  photo: fromPhoto.State;
}

export interface State extends fromRoot.State {
  photo: PhotoState;
}

export const reducers = {
  photo: fromPhoto.reducer,
};

export const getPhotoState = createFeatureSelector<PhotoState>('photo');

export const getPhotoEntitiesState = createSelector(
  getPhotoState,
  state => state.photo,
);

export const getSelectedPhotoId = createSelector(
  getPhotoEntitiesState,
  fromPhoto.getSelectedId,
);

export const {
  selectIds: getPhotoIds,
  selectEntities: getPhotoEntities,
  selectAll: getAllPhotos,
  selectTotal: getTotalPhotos,
} = fromPhoto.adapter.getSelectors(getPhotoEntitiesState);

export const getSelectedPhoto = createSelector(
  getPhotoEntities,
  getSelectedPhotoId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);
