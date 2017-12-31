import { GalleryActions, GalleryActionTypes } from '../actions/gallery';

export interface State {
  page: number;
}

export const initialState: State = {
  page: 1,
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

    default: {
      return state;
    }
  }
}

export const getPage = (state: State) => state.page;
