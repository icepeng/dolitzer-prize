import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appConfig } from '../../config';
import * as fromRoot from '../../reducers';
import * as fromHistory from './history';
import * as fromList from './list';

export interface HistoryState {
  history: fromHistory.State;
  list: fromList.State;
}

export interface State extends fromRoot.State {
  history: HistoryState;
}

export const reducers = {
  history: fromHistory.reducer,
  list: fromList.reducer,
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
  history => (history ? history.photoIds : []),
);

export const getSelectedPhotosTotal = createSelector(
  getSelectedHistoryPhotoIds,
  ids => ids.length,
);

/// Page

export const getHistoryListState = createSelector(
  getHistoryState,
  (state: HistoryState) => state.list,
);

export const getPage = createSelector(getHistoryListState, fromList.getPage);

export const getSortColumn = createSelector(getHistoryListState, fromList.getSortColumn);

export const getSortOrder = createSelector(getHistoryListState, fromList.getSortOrder);
