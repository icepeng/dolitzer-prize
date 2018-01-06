import { AuthActions, AuthActionTypes } from '../actions/auth';

export interface State {
  token: string | null;
  id: string | null;
  exp: number | null;
  loggedIn: boolean;
}

export const initialState: State = {
  token: null,
  id: null,
  exp: null,
  loggedIn: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        token: action.payload.token,
        exp: action.payload.decoded.exp,
        id: action.payload.decoded.id,
        loggedIn: true,
      };
    }

    case AuthActionTypes.LoginFailure:
    case AuthActionTypes.Logout: {
      return {
        token: null,
        exp: null,
        id: null,
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

export const getId = (state: State) => state.id;

export const getLoggedIn = (state: State) => state.loggedIn;
