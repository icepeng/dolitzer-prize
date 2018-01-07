import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromUser from './user';
import * as fromPhoto from './photo';
import * as fromLikedPhoto from './liked-photo';

export interface UserState {
  user: fromUser.State;
  photo: fromPhoto.State;
  likedPhoto: fromLikedPhoto.State;
}

export interface State extends fromRoot.State {
  user: UserState;
}

export const reducers = {
  user: fromUser.reducer,
  photo: fromPhoto.reducer,
  likedPhoto: fromLikedPhoto.reducer,
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

export const getSelectedUserPhotoTotal = createSelector(
  getSelectedUserPhotoIds,
  ids => ids ? ids.length : null,
);

export const getSelectedUserLikedPhotoIds = createSelector(
  getSelectedUser,
  user => user && user.likedPhotoIds,
);

export const getSelectedUserLikedPhotoTotal = createSelector(
  getSelectedUserLikedPhotoIds,
  ids => ids ? ids.length : null,
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
  user => (user ? user.photoIds : []),
);

export const getAuthedUserLikedPhotoIds = createSelector(
  getAuthedUser,
  user => (user ? user.likedPhotoIds : []),
);

export const getAuthedUserBattletag = createSelector(
  getAuthedUser,
  user => user && user.battletag,
);

// Photo

export const getUserPhotoState = createSelector(
  getUserState,
  state => state.photo,
);

export const {
  selectEntities: getUserPhotoListEntities,
} = fromPhoto.adapter.getSelectors(getUserPhotoState);

export const getSelectedUserPhotoList = createSelector(
  getSelectedUserId,
  getUserPhotoListEntities,
  (id, entities) => id && entities[id],
);

export const getSelectedUserPhotoListPage = createSelector(
  getSelectedUserPhotoList,
  list => list && list.page,
);

export const getSelectedUserPhotoListSortOrder = createSelector(
  getSelectedUserPhotoList,
  list => list && list.sortOrder,
);

export const getSelectedUserPhotoListSortColumn = createSelector(
  getSelectedUserPhotoList,
  list => list && list.sortColumn,
);

// Liked Photo

export const getUserLikedPhotoState = createSelector(
  getUserState,
  state => state.likedPhoto,
);

export const {
  selectEntities: getUserLikedPhotoListEntities,
} = fromLikedPhoto.adapter.getSelectors(getUserLikedPhotoState);

export const getSelectedUserLikedPhotoList = createSelector(
  getSelectedUserId,
  getUserLikedPhotoListEntities,
  (id, entities) => id && entities[id],
);

export const getSelectedUserLikedPhotoListPage = createSelector(
  getSelectedUserLikedPhotoList,
  list => list && list.page,
);

export const getSelectedUserLikedPhotoListSortOrder = createSelector(
  getSelectedUserLikedPhotoList,
  list => list && list.sortOrder,
);

export const getSelectedUserLikedPhotoListSortColumn = createSelector(
  getSelectedUserLikedPhotoList,
  list => list && list.sortColumn,
);
