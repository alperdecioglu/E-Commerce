
import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  INCREMENT_ITEM_COUNT, 
  DECREMENT_ITEM_COUNT, 
  SET_CART, 
  SET_PAYMENT, 
  SET_ADDRESS,
  TOGGLE_ITEM_CHECKED,
  CLEAR_CART
} from "../actions/actionTypes";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

const updateCartItem = (cart, productId, change) => {
  return cart.map(item => 
    item.product.id === productId 
      ? { ...item, count: Math.max(0, item.count + change) }
      : item
  ).filter(item => item.count > 0);
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return { ...state, cart: updateCartItem(state.cart, action.payload.id, 1) };
      } else {
        const newItem = { count: 1, checked: true, product: action.payload };
        return { ...state, cart: [...state.cart, newItem] };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case INCREMENT_ITEM_COUNT:
      return { ...state, cart: updateCartItem(state.cart, action.payload, 1) };
    case DECREMENT_ITEM_COUNT:
      return { ...state, cart: updateCartItem(state.cart, action.payload, -1) };
    case TOGGLE_ITEM_CHECKED:
      return {
        ...state,
        cart: state.cart.map(item => 
          item.product.id === action.payload 
            ? { ...item, checked: !item.checked }
            : item
        )
      };
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };

    case CLEAR_CART:
      return {
    ...state,
    cart: [],
    payment: {},
    address: {},
  };

    default:
      return state;
  }
};