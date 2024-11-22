// store/actions/authActions.ts
import { LOGIN_SUCCESS, LOGOUT } from "../types/authTypes";

export const login = (user: any) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
