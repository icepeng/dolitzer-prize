import { createFeatureSelector, createSelector } from '@ngrx/store';

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

export const getGalleryStatusState = createSelector(
  getGalleryState,
  (state: GalleryState) => state.status,
);

export const getPage = createSelector(
  getGalleryStatusState,
  fromGallery.getPage,
);