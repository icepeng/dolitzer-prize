import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromPhoto from './photo';

export interface GallaryState {
  photo: fromPhoto.State;
}

export interface State extends fromRoot.State {
  gallary: GallaryState;
}

export const reducers = {
  photo: fromPhoto.reducer,
};

export const selectGallaryState = createFeatureSelector<GallaryState>('gallary');

export const selectGallaryPhotoState = createSelector(
  selectGallaryState,
  (state: GallaryState) => state.photo,
);

export const getPhotos = createSelector(selectGallaryPhotoState, fromPhoto.getPhotos);
