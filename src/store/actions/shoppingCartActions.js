import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  INCREMENT_ITEM_COUNT, 
  DECREMENT_ITEM_COUNT,
  TOGGLE_ITEM_CHECKED,
  SET_PAYMENT,
  SET_ADDRESS,
  SET_CART,
  CLEAR_CART
} from "./actionTypes";

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, payload: productId });
export const incrementItemCount = (productId) => ({ type: INCREMENT_ITEM_COUNT, payload: productId });
export const decrementItemCount = (productId) => ({ type: DECREMENT_ITEM_COUNT, payload: productId });
export const toggleItemChecked = (productId) => ({ type: TOGGLE_ITEM_CHECKED, payload: productId });

export const setPayment = (paymentInfo) => ({ type: SET_PAYMENT, payload: paymentInfo });
export const setAddress = (addressInfo) => ({ type: SET_ADDRESS, payload: addressInfo });
export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const clearCart = () => ({ type: CLEAR_CART });