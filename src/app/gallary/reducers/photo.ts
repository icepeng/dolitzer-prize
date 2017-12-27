import { PhotoActions, PhotoActionTypes } from '../actions/photo';
import { Photo } from '../models/photo';
import * as jwtDecode from 'jwt-decode';

export interface State {
  photos: Photo[];
}

export const initialState: State = {
  photos: [],
};

export function reducer(state = initialState, action: PhotoActions): State {
  switch (action.type) {
    case PhotoActionTypes.LoadSuccess: {
      return {
        ...state,
        photos: action.payload.photos,
      };
    }

    default: {
      return state;
    }
  }
}

export const getPhotos = (state: State) => state.photos;
