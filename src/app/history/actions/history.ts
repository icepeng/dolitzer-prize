import { Action } from '@ngrx/store';

import { Period } from '../../photo/models/period';

export enum HistoryActionTypes {
  NextPage = '[History] Next Page',
  PrevPage = '[History] Prev Page',
  SetPeriod = '[History] Set Period',
}

export class NextPage implements Action {
  readonly type = HistoryActionTypes.NextPage;
}

export class PrevPage implements Action {
  readonly type = HistoryActionTypes.PrevPage;
}

export class SetPeriod implements Action {
  readonly type = HistoryActionTypes.SetPeriod;

  constructor(public payload: Period) {}
}

export type HistoryActions = NextPage | PrevPage | SetPeriod;
