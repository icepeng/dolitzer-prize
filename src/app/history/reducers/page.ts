import { HistoryPageActions, HistoryPageActionTypes } from '../actions/page';

export interface State {
  page: number;
}

export const initialState: State = {
  page: 1,
};

export function reducer(
  state = initialState,
  action: HistoryPageActions,
): State {
  switch (action.type) {
    case HistoryPageActionTypes.NextPage: {
      return {
        ...state,
        page: state.page + 1,
      };
    }

    case HistoryPageActionTypes.PrevPage: {
      return {
        ...state,
        page: Math.max(state.page - 1, 1),
      };
    }

    default: {
      return state;
    }
  }
}

export const getPage = (state: State) => state.page;
