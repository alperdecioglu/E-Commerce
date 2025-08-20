import { 
  SET_CATEGORIES, 
  SET_PRODUCT_LIST, 
  SET_TOTAL, 
  SET_FETCH_STATE, 
  SET_LIMIT, 
  SET_OFFSET, 
  SET_FILTER,
  SET_SORT,
  SET_ACTIVE_PRODUCT
} from "./actionTypes";
import API from '../../api/axios';

export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const setProductList = (products) => ({ type: SET_PRODUCT_LIST, payload: products });
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState });
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
export const setSort = (sort) => ({ type: SET_SORT, payload: sort });
export const setActiveProduct = (product) => ({ type: SET_ACTIVE_PRODUCT, payload: product });

export const fetchCategories = () => (dispatch) => {
  API.get("/categories")
    .then(res => dispatch(setCategories(res.data)))
    .catch(err => {
      
    });
};

export const fetchProducts = (params) => (dispatch, getState) => {
  dispatch(setFetchState("FETCHING"));
  const { limit, offset } = getState().product;
  const requestParams = { limit, offset, ...params };
  API.get("/products", { params: requestParams })
    .then(res => {
      dispatch(setTotal(res.data.total));
      dispatch(setProductList(res.data.products));
      dispatch(setFetchState("FETCHED"));
    })
    .catch(err => {
      
      dispatch(setFetchState("FAILED"));
    });
};

export const fetchProductById = (productId) => (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  API.get(`/products/${productId}`)
    .then(res => {
      dispatch(setActiveProduct(res.data));
      dispatch(setFetchState("FETCHED"));
    })
    .catch(err => {
      
      dispatch(setFetchState("FAILED"));
    });
};