import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromUpload from './upload';

export interface UploadState {
  status: fromUpload.State;
}

export interface State extends fromRoot.State {
  gallary: UploadState;
}

export const reducers = {
  status: fromUpload.reducer,
};

export const selectUploadState = createFeatureSelector<UploadState>('upload');

export const selectUploadStatusState = createSelector(
  selectUploadState,
  (state: UploadState) => state.status,
);

export const getError = createSelector(
  selectUploadStatusState,
  fromUpload.getError,
);
