import { types } from "./types";

export function reducer(state: any, action: any) {
  switch (action.type) {
    case types.setNewToken:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.name
      };
    case types.setUserName:
      return {
        ...state,
        user: action.payload
      };
    default:
      throw new Error();
  }
}