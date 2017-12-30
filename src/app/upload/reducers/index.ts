import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromUpload from './upload';

export interface UploadState {
  status: fromUpload.State;
  // image: fromImage.State;
}

export interface State extends fromRoot.State {
  upload: UploadState;
}

export const reducers = {
  status: fromUpload.reducer,
  // image: fromImage.reducer,
};

export const getUploadState = createFeatureSelector<UploadState>('upload');

export const getUploadStatusState = createSelector(
  getUploadState,
  (state: UploadState) => state.status,
);

export const getError = createSelector(
  getUploadStatusState,
  fromUpload.getError,
);

export const getIsLoading = createSelector(
  getUploadStatusState,
  fromUpload.getIsLoading,
);

// export const getImageState = createSelector(
//   getUploadState,
//   (state: UploadState) => state.image,
// );

// export const getImageError = createSelector(getImageState, fromImage.getError);

// export const getImgLink = createSelector(getImageState, fromImage.getImgLink);

// export const getIsImageUploading = createSelector(
//   getImageState,
//   fromImage.getIsUploading,
// );
