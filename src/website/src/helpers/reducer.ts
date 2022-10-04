import { types } from "./types";

export function reducer(state: any, action: any) {
  switch (action.type) {
    case types.setNewToken:
      return {
        ...state,
        token: action.payload
      };
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}