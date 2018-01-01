import { AuthActions, AuthActionTypes } from '../../auth/actions/auth';
import { UserActions, UserActionTypes } from '../actions/user';
import { UserDetail } from '../models/user';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

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
  action: UserActions | AuthActions,
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
        authedUserId: action.payload.user.id,
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedUserId;

export const getAuthedId = (state: State) => state.authedUserId;
