import { getPeriodKey } from './util';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appConfig } from '../../config';
import * as fromPhoto from '../../photo/reducers';
import * as fromRoot from '../../reducers';
import * as fromHistory from './history';

export interface HistoryState {
  status: fromHistory.State;
}

export interface State extends fromRoot.State {
  history: HistoryState;
}

export const reducers = {
  status: fromHistory.reducer,
};

export const getHistoryState = createFeatureSelector<HistoryState>('history');

export const getHistoryStatusState = createSelector(
  getHistoryState,
  (state: HistoryState) => state.status,
);

export const getPage = createSelector(
  getHistoryStatusState,
  fromHistory.getPage,
);

export const getPeriod = createSelector(
  getHistoryStatusState,
  fromHistory.getPeriod,
);

export const getVisitedPeriod = createSelector(
  getHistoryStatusState,
  fromHistory.getVisitedPeriod,
);

export const isVisited = createSelector(
  getPeriod,
  getVisitedPeriod,
  (period, visited) => visited[getPeriodKey(period)],
);

export const getHistoryPhotos = createSelector(
  fromPhoto.getAllPhotos,
  getPeriod,
  (photos, period) =>
    photos.filter(
      photo =>
        photo.period.month === period.month &&
        photo.period.year === period.year,
    ),
);

export const getPagePhotos = createSelector(
  getHistoryPhotos,
  getPage,
  (photos, page) =>
    photos.slice((page - 1) * appConfig.perPage, page * appConfig.perPage),
);

export const getHistoryTotal = createSelector(
  getHistoryPhotos,
  photos => photos.length,
);

export const getIndex = createSelector(
  getHistoryPhotos,
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
  getHistoryPhotos,
  getIndex,
  (photos, index) => (photos[index + 1] ? photos[index + 1].id : null),
);

export const getPrevId = createSelector(
  getHistoryPhotos,
  getIndex,
  (photos, index) => (photos[index - 1] ? photos[index - 1].id : null),
);
