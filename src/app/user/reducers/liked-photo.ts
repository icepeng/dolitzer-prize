import { UserActions, UserActionTypes } from '../actions/user';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserPhotoList } from '../models/user';
import {
  UserLikedPhotoActions,
  UserLikedPhotoActionTypes,
} from '../actions/liked-photo';

export interface State extends EntityState<UserPhotoList> {}

export const adapter: EntityAdapter<UserPhotoList> = createEntityAdapter<
  UserPhotoList
>({
  selectId: (list: UserPhotoList) => list.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: UserLikedPhotoActions | UserActions,
): State {
  switch (action.type) {
    case UserActionTypes.LoadSuccess: {
      return {
        ...adapter.addOne(
          {
            id: action.payload.user.id,
            page: 1,
            sortColumn: 'createTime',
            sortOrder: 'DESC',
          },
          state,
        ),
      };
    }

    case UserLikedPhotoActionTypes.NextPage: {
      const id = action.payload;
      return {
        ...adapter.updateOne(
          {
            id,
            changes: { page: state.entities[id].page + 1 },
          },
          state,
        ),
      };
    }

    case UserLikedPhotoActionTypes.PrevPage: {
      const id = action.payload;
      return {
        ...adapter.updateOne(
          {
            id,
            changes: { page: state.entities[id].page - 1 },
          },
          state,
        ),
      };
    }

    case UserLikedPhotoActionTypes.Sort: {
      const id = action.payload.id;
      return {
        ...adapter.updateOne(
          {
            id,
            changes: {
              sortColumn: action.payload.sortColumn,
              sortOrder: action.payload.sortOrder,
            },
          },
          state,
        ),
      };
    }

    default: {
      return state;
    }
  }
}
