import { AuthActions, AuthActionTypes } from '../actions/auth';

export interface State {
  token: string | null;
  loggedIn: boolean;
}

export const initialState: State = {
  token: null,
  loggedIn: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.Login: {
      const token = action.payload;
      return {
        ...state,
        token,
      };
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
      };
    }

    case AuthActionTypes.LoginFailure:
    case AuthActionTypes.Logout: {
      return {
        token: null,
        loggedIn: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getToken = (state: State) => state.token;

export const getLoggedIn = (state: State) => state.loggedIn;
