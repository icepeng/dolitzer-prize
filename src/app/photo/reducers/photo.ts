import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import {
  GalleryActions,
  GalleryActionTypes,
} from '../../gallery/actions/gallery';
import {
  HistoryActions,
  HistoryActionTypes,
} from '../../history/actions/history';
import { UserActions, UserActionTypes } from '../../user/actions/user';
import { PhotoActions, PhotoActionTypes } from '../actions/photo';
import { Photo } from '../models/photo';

export interface State extends EntityState<Photo> {
  selectedPhotoId: number | null;
}

export const adapter: EntityAdapter<Photo> = createEntityAdapter<Photo>({
  selectId: (photo: Photo) => photo.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedPhotoId: null,
});

export function reducer(
  state = initialState,
  action: PhotoActions | HistoryActions | GalleryActions | UserActions,
): State {
  switch (action.type) {
    case PhotoActionTypes.LoadSuccess: {
      const photo = action.payload;
      state = adapter.addOne(photo, state);
      return {
        ...adapter.updateOne({ id: photo.id, changes: photo }, state),
        selectedPhotoId: state.selectedPhotoId,
      };
    }

    case GalleryActionTypes.LoadSuccess: {
      return {
        ...adapter.addMany(action.payload, state),
        selectedPhotoId: state.selectedPhotoId,
      };
    }

    case HistoryActionTypes.LoadSuccess: {
      return {
        ...adapter.addMany(action.payload.photos, state),
        selectedPhotoId: state.selectedPhotoId,
      };
    }

    case UserActionTypes.LoadSuccess: {
      return {
        ...adapter.addMany(
          [...action.payload.photos, ...action.payload.likedPhotos],
          state,
        ),
        selectedPhotoId: state.selectedPhotoId,
      };
    }

    case PhotoActionTypes.Select: {
      return {
        ...state,
        selectedPhotoId: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedPhotoId;
