import { HistoryListActions, HistoryListActionTypes } from '../actions/list';

export interface State {
  page: number;
  sortColumn: string;
  sortOrder: 'ASC' | 'DESC';
}

export const initialState: State = {
  page: 1,
  sortColumn: 'createTime',
  sortOrder: 'DESC',
};

export function reducer(
  state = initialState,
  action: HistoryListActions,
): State {
  switch (action.type) {
    case HistoryListActionTypes.NextPage: {
      return {
        ...state,
        page: state.page + 1,
      };
    }

    case HistoryListActionTypes.PrevPage: {
      return {
        ...state,
        page: Math.max(state.page - 1, 1),
      };
    }

    case HistoryListActionTypes.Sort: {
      return {
        ...state,
        sortOrder: action.payload.sortOrder,
        sortColumn: action.payload.sortColumn,
      };
    }

    default: {
      return state;
    }
  }
}

export const getPage = (state: State) => state.page;

export const getSortOrder = (state: State) => state.sortOrder;

export const getSortColumn = (state: State) => state.sortColumn;
