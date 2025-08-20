import { 
  SET_USER, 
  SET_ROLES, 
  SET_THEME, 
  SET_LANGUAGE,
  SET_ADDRESSES,
  SET_CREDIT_CARDS
} from "../actions/actionTypes";

const initialState = {
  user: {},
  roles: [],
  theme: "light",
  language: "en",
  addresses: [],
  creditCards: []
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_ADDRESSES:
      return { ...state, addresses: action.payload };
    case SET_CREDIT_CARDS:
      return { ...state, creditCards: action.payload };
      
    default:
      return state;
  }
};