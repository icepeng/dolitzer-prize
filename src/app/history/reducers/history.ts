import { Period } from '../../photo/models/period';
import { HistoryActions, HistoryActionTypes } from '../actions/history';

export interface State {
  page: number;
  period: Period;
}

export const initialState: State = {
  page: 1,
  period: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  },
};

export function reducer(state = initialState, action: HistoryActions): State {
  switch (action.type) {
    case HistoryActionTypes.NextPage: {
      return {
        ...state,
        page: state.page + 1,
      };
    }

    case HistoryActionTypes.PrevPage: {
      return {
        ...state,
        page: Math.max(state.page - 1, 1),
      };
    }

    case HistoryActionTypes.SetPeriod: {
      return {
        ...state,
        period: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getPage = (state: State) => state.page;

export const getPeriod = (state: State) => state.period;
