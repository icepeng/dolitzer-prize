import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromUser from './user';

export interface UserState {
  user: fromUser.State;
}

export interface State extends fromRoot.State {
  user: UserState;
}

export const reducers = {
  user: fromUser.reducer,
};

export const getUserState = createFeatureSelector<UserState>('user');

export const getUserEntitiesState = createSelector(
  getUserState,
  state => state.user,
);

export const getSelectedUserId = createSelector(
  getUserEntitiesState,
  fromUser.getSelectedId,
);

export const getAuthedUserId = createSelector(
  getUserEntitiesState,
  fromUser.getAuthedId,
);

export const {
  selectIds: getUserIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers,
} = fromUser.adapter.getSelectors(getUserEntitiesState);

export const getSelectedUser = createSelector(
  getUserEntities,
  getSelectedUserId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);

export const getSelectedUserPhotoIds = createSelector(
  getSelectedUser,
  user => user && user.photoIds,
);

export const getSelectedUserLikedPhotoIds = createSelector(
  getSelectedUser,
  user => user && user.likedPhotoIds,
);

export const getSelectedUserBattletag = createSelector(
  getSelectedUser,
  user => user && user.battletag,
);

// Authed User

export const getAuthedUser = createSelector(
  getUserEntities,
  getAuthedUserId,
  (entities, authedId) => {
    return authedId && entities[authedId];
  },
);

export const getAuthedUserPhotoIds = createSelector(
  getAuthedUser,
  user => user ? user.photoIds : [],
);

export const getAuthedUserLikedPhotoIds = createSelector(
  getAuthedUser,
  user => user ? user.likedPhotoIds : [],
);

export const getAuthedUserBattletag = createSelector(
  getAuthedUser,
  user => user && user.battletag,
);
