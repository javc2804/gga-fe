// store/reducers/authReducer.ts
import { LOGIN_SUCCESS, LOGOUT } from "../types/authTypes";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
