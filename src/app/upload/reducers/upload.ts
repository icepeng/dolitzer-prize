import { HttpErrorResponse } from '@angular/common/http';
import { UploadActions, UploadActionTypes } from '../actions/upload';
import { Upload } from '../models/upload';

export interface State {
  isLoading: boolean;
  error: any;
}

export const initialState: State = {
  isLoading: false,
  error: null,
};

export function reducer(state = initialState, action: UploadActions): State {
  switch (action.type) {
    case UploadActionTypes.Submit: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UploadActionTypes.SubmitSuccess: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case UploadActionTypes.SubmitFailure: {
      return {
        isLoading: false,
        error: action.payload,
      };
    }

    case UploadActionTypes.Init: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;

export const getIsLoading = (state: State) => state.isLoading;
