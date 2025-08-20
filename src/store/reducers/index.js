
import { combineReducers } from "redux";
import { clientReducer } from "./clientReducer";
import { productReducer } from "./productReducer";
import { shoppingCartReducer } from "./shoppingCartReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shopping: shoppingCartReducer,
  order: orderReducer,
});