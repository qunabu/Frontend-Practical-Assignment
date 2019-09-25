import * as ACTIONS from "./actions";

export const INITIAL_STATE = {
  loading: false,
  error: null,
  currencies: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.FETCH:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ACTIONS.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currencies: action.data[0].rates
      };
    case ACTIONS.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
