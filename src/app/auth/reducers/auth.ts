import { AuthActions, AuthActionTypes } from '../actions/auth';

export interface State {
  token: string | null;
  exp: number | null;
  loggedIn: boolean;
}

export const initialState: State = {
  token: null,
  exp: null,
  loggedIn: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        token: action.payload.token,
        exp: action.payload.decoded.exp,
        loggedIn: true,
      };
    }

    case AuthActionTypes.LoginFailure:
    case AuthActionTypes.Logout: {
      return {
        token: null,
        exp: null,
        loggedIn: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getToken = (state: State) => state.token;

export const getExp = (state: State) => state.exp;

export const getLoggedIn = (state: State) => state.loggedIn;
