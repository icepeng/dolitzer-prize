import { Action } from '@ngrx/store';

export enum HistoryListActionTypes {
  NextPage = '[History List] Next Page',
  PrevPage = '[History List] Prev Page',
  Sort = '[History List] Sort',
}

export class NextPage implements Action {
  readonly type = HistoryListActionTypes.NextPage;
}

export class PrevPage implements Action {
  readonly type = HistoryListActionTypes.PrevPage;
}

export class Sort implements Action {
  readonly type = HistoryListActionTypes.Sort;

  constructor(public payload: { sortColumn: string; sortOrder: 'ASC' | 'DESC' }) {}
}

export type HistoryListActions = NextPage | PrevPage | Sort;
