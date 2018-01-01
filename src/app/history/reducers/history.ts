import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Period } from '../../photo/models/period';
import { HistoryActions, HistoryActionTypes } from '../actions/history';
import { History } from '../models/history';
import { getKeyFromPeriod, getLastMonthPeriod } from './util';

export interface State extends EntityState<History> {
  selectedId: string;
  selectedPeriod: Period;
}

export const adapter: EntityAdapter<History> = createEntityAdapter<History>({
  selectId: (history: History) => history.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedId: getKeyFromPeriod(getLastMonthPeriod()),
  selectedPeriod: getLastMonthPeriod(),
});

export function reducer(state = initialState, action: HistoryActions): State {
  switch (action.type) {
    case HistoryActionTypes.SetPeriod: {
      return {
        ...state,
        selectedId: getKeyFromPeriod(action.payload),
        selectedPeriod: action.payload,
      };
    }

    case HistoryActionTypes.LoadSuccess: {
      return {
        ...adapter.addOne(
          {
            id: getKeyFromPeriod(action.payload.period),
            photoIds: action.payload.photos.map(photo => photo.id),
          },
          state,
        ),
        selectedId: state.selectedId,
        selectedPeriod: state.selectedPeriod,
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedId;

export const getSelectedPeriod = (state: State) => state.selectedPeriod;
