import { AuthActions, AuthActionTypes } from '../actions/auth';
import { User } from '../models/user';
import * as jwtDecode from 'jwt-decode';

export interface State {
  user: User | null;
  token: string;
  loggedIn: boolean;
}

export const initialState: State = {
  user: null,
  token: null,
  loggedIn: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      const token = action.payload.token;
      localStorage.setItem('token', token);
      return {
        token,
        user: action.payload.user,
        loggedIn: true,
      };
    }

    case AuthActionTypes.Logout: {
      localStorage.removeItem('token');
      return {
        user: null,
        token: null,
        loggedIn: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;

export const getToken = (state: State) => state.token;

export const getLoggedIn = (state: State) => state.loggedIn;
