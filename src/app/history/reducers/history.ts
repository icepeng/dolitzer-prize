import { PhotoActions, PhotoActionTypes } from '../../photo/actions/photo';
import { Period } from '../../photo/models/period';
import { HistoryActions, HistoryActionTypes } from '../actions/history';
import { getLastMonthPeriod, getPeriodKey } from './util';

export interface State {
  page: number;
  period: Period;
  visitedPeriod: {
    [key: string]: boolean;
  };
}

export const initialState: State = {
  page: 1,
  period: getLastMonthPeriod(),
  visitedPeriod: {},
};

export function reducer(
  state = initialState,
  action: HistoryActions | PhotoActions,
): State {
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

    case PhotoActionTypes.Load: {
      return {
        ...state,
        visitedPeriod: {
          ...state.visitedPeriod,
          [getPeriodKey(action.payload)]: true,
        },
      };
    }

    default: {
      return state;
    }
  }
}

export const getPage = (state: State) => state.page;

export const getPeriod = (state: State) => state.period;

export const getVisitedPeriod = (state: State) => state.visitedPeriod;
