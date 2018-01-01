import { Action } from '@ngrx/store';

export enum HistoryPageActionTypes {
  NextPage = '[History Page] Next Page',
  PrevPage = '[History Page] Prev Page',
}

export class NextPage implements Action {
  readonly type = HistoryPageActionTypes.NextPage;
}

export class PrevPage implements Action {
  readonly type = HistoryPageActionTypes.PrevPage;
}

export type HistoryPageActions = NextPage | PrevPage;
