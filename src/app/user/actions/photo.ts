import { Photo } from '../../photo/models/photo';
import { Action } from '@ngrx/store';

export enum UserPhotoActionTypes {
  NextPage = '[User Photo] Next Page',
  PrevPage = '[User Photo] Prev Page',
  Sort = '[User Photo] Sort',
}

export class NextPage implements Action {
  readonly type = UserPhotoActionTypes.NextPage;

  constructor(public payload: string) {}
}

export class PrevPage implements Action {
  readonly type = UserPhotoActionTypes.PrevPage;

  constructor(public payload: string) {}
}

export class Sort implements Action {
  readonly type = UserPhotoActionTypes.Sort;

  constructor(
    public payload: {
      id: string;
      sortColumn: string;
      sortOrder: 'ASC' | 'DESC';
    },
  ) {}
}

export type UserPhotoActions = NextPage | PrevPage | Sort;
