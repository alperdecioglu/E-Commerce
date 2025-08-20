import { SET_ORDERS, SET_ORDER_FETCH_STATE } from "../actions/actionTypes";

const initialState = {
  orderList: [],
  fetchState: "NOT_FETCHED",
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orderList: action.payload };
    case SET_ORDER_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    default:
      return state;
  }
};