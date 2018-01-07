import { UserActions, UserActionTypes } from '../actions/user';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserPhotoList } from '../models/user';
import {
  UserPhotoActions,
  UserPhotoActionTypes,
} from '../actions/photo';

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
  action: UserPhotoActions | UserActions,
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

    case UserPhotoActionTypes.NextPage: {
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

    case UserPhotoActionTypes.PrevPage: {
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

    case UserPhotoActionTypes.Sort: {
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
