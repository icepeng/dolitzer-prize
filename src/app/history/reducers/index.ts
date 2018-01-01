import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appConfig } from '../../config';
import * as fromPhoto from '../../photo/reducers';
import * as fromRoot from '../../reducers';
import * as fromHistory from './history';
import * as fromPage from './page';

export interface HistoryState {
  history: fromHistory.State;
  page: fromPage.State;
}

export interface State extends fromRoot.State {
  history: HistoryState;
}

export const reducers = {
  history: fromHistory.reducer,
  page: fromPage.reducer,
};

export const getHistoryState = createFeatureSelector<HistoryState>('history');

/// History

export const getHistoryEntitiesState = createSelector(
  getHistoryState,
  (state: HistoryState) => state.history,
);

export const getSelectedHistoryId = createSelector(
  getHistoryEntitiesState,
  fromHistory.getSelectedId,
);

export const getSelectedPeriod = createSelector(
  getHistoryEntitiesState,
  fromHistory.getSelectedPeriod,
);

export const {
  selectIds: getHistoryIds,
  selectEntities: getHistoryEntities,
  selectAll: getAllHistories,
  selectTotal: getTotalHistories,
} = fromHistory.adapter.getSelectors(getHistoryEntitiesState);

export const getSelectedHistory = createSelector(
  getHistoryEntities,
  getSelectedHistoryId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);

export const getSelectedPhotos = createSelector(
  fromPhoto.getPhotoEntities,
  getSelectedHistory,
  (photoEntities, history) => history ? history.photoIds.map(id => photoEntities[id]) : [],
);

export const getSelectedPhotosTotal = createSelector(
  getSelectedPhotos,
  photos => photos.length,
);

/// Page

export const getHistoryPageState = createSelector(
  getHistoryState,
  (state: HistoryState) => state.page,
);

export const getPage = createSelector(getHistoryPageState, fromPage.getPage);

export const getPagePhotos = createSelector(
  getSelectedPhotos,
  getPage,
  (photos, page) =>
    photos.slice((page - 1) * appConfig.perPage, page * appConfig.perPage),
);

// View

export const getIndex = createSelector(
  getSelectedPhotos,
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
  getSelectedPhotos,
  getIndex,
  (photos, index) => (photos[index + 1] ? photos[index + 1].id : null),
);

export const getPrevId = createSelector(
  getSelectedPhotos,
  getIndex,
  (photos, index) => (photos[index - 1] ? photos[index - 1].id : null),
);
