import { GalleryActions, GalleryActionTypes } from '../actions/gallery';

export interface State {
  page: number;
  sortColumn: string;
  sortOrder: 'ASC' | 'DESC';
  photoIds: number[];
}

export const initialState: State = {
  page: 1,
  sortColumn: 'createTime',
  sortOrder: 'DESC',
  photoIds: [],
};

export function reducer(state = initialState, action: GalleryActions): State {
  switch (action.type) {
    case GalleryActionTypes.NextPage: {
      return {
        ...state,
        page: state.page + 1,
      };
    }

    case GalleryActionTypes.PrevPage: {
      return {
        ...state,
        page: Math.max(state.page - 1, 1),
      };
    }

    case GalleryActionTypes.LoadSuccess: {
      return {
        ...state,
        photoIds: action.payload.map(photo => photo.id),
      };
    }

    case GalleryActionTypes.Sort: {
      return {
        ...state,
        sortOrder: action.payload.sortOrder,
        sortColumn: action.payload.sortColumn,
      };
    }

    default: {
      return state;
    }
  }
}

export const getPage = (state: State) => state.page;

export const getPhotoIds = (state: State) => state.photoIds;

export const getSortOrder = (state: State) => state.sortOrder;

export const getSortColumn = (state: State) => state.sortColumn;
