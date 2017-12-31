import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromHistory from './history';
import * as fromPhoto from '../../photo/reducers';

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

export const getHistoryTotal = createSelector(
  getHistoryPhotos,
  photos => photos.length,
);
