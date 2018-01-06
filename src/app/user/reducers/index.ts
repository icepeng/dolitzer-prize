import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPhoto from '../../photo/reducers';
import * as fromRoot from '../../reducers';
import * as fromUser from './user';
import * as fromAuth from '../../auth/reducers';

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

export const getSelectedUserPhotos = createSelector(
  getSelectedUser,
  fromPhoto.getPhotoEntities,
  (user, entities) => user && user.photoIds.map(id => entities[id]),
);

export const getSelectedUserLikedPhotos = createSelector(
  getSelectedUser,
  fromPhoto.getPhotoEntities,
  (user, entities) => user && user.likedPhotoIds.map(id => entities[id]),
);

export const getSelectedUserBattletag = createSelector(
  getSelectedUser,
  user => user && user.battletag,
);

// Authed User

export const getAuthedUser = createSelector(
  getUserEntities,
  fromAuth.getId,
  (entities, authedId) => {
    return authedId && entities[authedId];
  },
);

export const getAuthedUserPhotoIds = createSelector(
  getAuthedUser,
  user => user && user.photoIds,
);

export const getAuthedUserLikedPhotoIds = createSelector(
  getAuthedUser,
  user => user && user.likedPhotoIds,
);

export const getAuthedUserBattletag = createSelector(
  getAuthedUser,
  user => user && user.battletag,
);
