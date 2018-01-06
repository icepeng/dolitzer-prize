import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appConfig } from '../../config';
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

export const getSelectedHistoryPhotoIds = createSelector(
  getSelectedHistory,
  history => history ? history.photoIds : [],
);

export const getSelectedPhotosTotal = createSelector(
  getSelectedHistoryPhotoIds,
  ids => ids.length,
);

/// Page

export const getHistoryPageState = createSelector(
  getHistoryState,
  (state: HistoryState) => state.page,
);

export const getPage = createSelector(getHistoryPageState, fromPage.getPage);
