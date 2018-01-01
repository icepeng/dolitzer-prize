import { Action } from '@ngrx/store';

import { Period } from '../../photo/models/period';
import { Photo } from '../../photo/models/photo';

export enum HistoryActionTypes {
  SetPeriod = '[History] Set Period',
  Load = '[History] Load',
  LoadSuccess = '[History] Load Success',
  LoadFailure = '[History] Load Failure',
}

export class SetPeriod implements Action {
  readonly type = HistoryActionTypes.SetPeriod;

  constructor(public payload: Period) {}
}

export class Load implements Action {
  readonly type = HistoryActionTypes.Load;

  constructor(public payload: Period) {}
}

export class LoadSuccess implements Action {
  readonly type = HistoryActionTypes.LoadSuccess;

  constructor(public payload: { period: Period; photos: Photo[] }) {}
}

export class LoadFailure implements Action {
  readonly type = HistoryActionTypes.LoadFailure;

  constructor(public payload: any) {}
}

export type HistoryActions = SetPeriod | Load | LoadSuccess | LoadFailure;
