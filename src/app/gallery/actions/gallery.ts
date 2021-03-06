import { Photo } from '../../photo/models/photo';
import { Action } from '@ngrx/store';

export enum GalleryActionTypes {
  NextPage = '[Gallery] Next Page',
  PrevPage = '[Gallery] Prev Page',
  Load = '[Gallery] Load',
  LoadSuccess = '[Gallery] Load Success',
  LoadFailure = '[Gallery] Load Failure',
  Sort = '[Gallery] Sort',
}

export class NextPage implements Action {
  readonly type = GalleryActionTypes.NextPage;
}

export class PrevPage implements Action {
  readonly type = GalleryActionTypes.PrevPage;
}

export class Load implements Action {
  readonly type = GalleryActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = GalleryActionTypes.LoadSuccess;

  constructor(public payload: Photo[]) {}
}

export class LoadFailure implements Action {
  readonly type = GalleryActionTypes.LoadFailure;

  constructor(public payload: any) {}
}

export class Sort implements Action {
  readonly type = GalleryActionTypes.Sort;

  constructor(public payload: { sortColumn: string; sortOrder: 'ASC' | 'DESC' }) {}
}

export type GalleryActions = NextPage | PrevPage | Load | LoadSuccess | LoadFailure | Sort;
