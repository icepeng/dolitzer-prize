import { HttpErrorResponse } from '@angular/common/http';
import { ImageActions, ImageActionTypes } from '../actions/image';
import { Upload } from '../models/upload';

export interface State {
  isUploading: boolean;
  imgLink: string | null;
  error: any;
}

export const initialState: State = {
  error: null,
  imgLink: null,
  isUploading: false,
};

export function reducer(state = initialState, action: ImageActions): State {
  switch (action.type) {
    case ImageActionTypes.Upload: {
      return {
        ...state,
        isUploading: true,
      };
    }

    case ImageActionTypes.UploadSuccess: {
      return {
        imgLink: action.payload,
        isUploading: false,
        error: null,
      };
    }

    case ImageActionTypes.UploadFailure: {
      return {
        ...state,
        isUploading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;

export const getIsUploading = (state: State) => state.isUploading;

export const getImgLink = (state: State) => state.imgLink;
