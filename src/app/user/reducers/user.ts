import { AuthActions, AuthActionTypes } from '../../auth/actions/auth';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { LikeActions, LikeActionTypes } from '../../photo/actions/like';
import { UserActions, UserActionTypes } from '../actions/user';
import { UserDetail } from '../models/user';

export interface State extends EntityState<UserDetail> {
  selectedUserId: string | null;
  authedUserId: string | null;
}

export const adapter: EntityAdapter<UserDetail> = createEntityAdapter<
  UserDetail
>({
  selectId: (user: UserDetail) => user.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedUserId: null,
  authedUserId: null,
});

export function reducer(
  state = initialState,
  action: UserActions | AuthActions | LikeActions,
): State {
  switch (action.type) {
    case UserActionTypes.LoadSuccess: {
      return {
        ...adapter.addOne(action.payload.user, state),
        selectedUserId: state.selectedUserId,
        authedUserId: state.authedUserId,
      };
    }

    case UserActionTypes.Select: {
      return {
        ...state,
        selectedUserId: action.payload,
      };
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        authedUserId: action.payload.decoded.id,
      };
    }

    case LikeActionTypes.LikeSuccess: {
      if (!state.authedUserId) {
        return state;
      }
      return {
        ...adapter.updateOne(
          {
            id: state.authedUserId,
            changes: {
              likedPhotoIds: [
                ...state.entities[state.authedUserId].likedPhotoIds,
                action.payload,
              ],
            },
          },
          state,
        ),
        selectedUserId: state.selectedUserId,
        authedUserId: state.authedUserId,
      };
    }

    case LikeActionTypes.CancelLikeSuccess: {
      if (!state.authedUserId) {
        return state;
      }
      const likedPhotoIds = state.entities[state.authedUserId].likedPhotoIds;
      const index = likedPhotoIds.indexOf(action.payload);
      return {
        ...adapter.updateOne(
          {
            id: state.authedUserId,
            changes: {
              likedPhotoIds: [
                ...likedPhotoIds.slice(0, index),
                ...likedPhotoIds.slice(index + 1),
              ],
            },
          },
          state,
        ),
        selectedUserId: state.selectedUserId,
        authedUserId: state.authedUserId,
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedUserId;

export const getAuthedId = (state: State) => state.authedUserId;
