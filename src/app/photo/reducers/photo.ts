import {
  GalleryActions,
  GalleryActionTypes,
} from '../../gallery/actions/gallery';
import {
  HistoryActions,
  HistoryActionTypes,
} from '../../history/actions/history';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

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
  action: PhotoActions | HistoryActions | GalleryActions,
): State {
  switch (action.type) {
    case PhotoActionTypes.LoadSuccess: {
      return {
        ...adapter.addOne(action.payload, state),
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
