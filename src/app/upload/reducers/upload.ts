import { HttpErrorResponse } from '@angular/common/http';
import { UploadActions, UploadActionTypes } from '../actions/upload';
import { Upload } from '../models/upload';

export interface State {
  error: any;
}

export const initialState: State = {
  error: null,
};

export function reducer(state = initialState, action: UploadActions): State {
  switch (action.type) {
    case UploadActionTypes.SubmitFailure: {
      return {
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
