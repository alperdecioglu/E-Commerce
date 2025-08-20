import { toast } from 'react-toastify';
import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, SET_ADDRESSES, SET_CREDIT_CARDS } from "./actionTypes";
import API, { setAuthToken } from "../../api/axios";

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setAddresses = (addresses) => ({ type: SET_ADDRESSES, payload: addresses });
export const setCreditCards = (cards) => ({ type: SET_CREDIT_CARDS, payload: cards });

export const loginUser = (formData, history) => (dispatch) => {
  API.post("/login", formData)
    .then(res => {
      dispatch(setUser(res.data));
      
      setAuthToken(res.data.token);

      if (formData.rememberMe) {
        localStorage.setItem("token", res.data.token);
      }
      
      toast.success("Tekrar hoş geldiniz.");
      const previousPage = history.location.state?.from?.pathname || "/";
      history.push(previousPage);
    })
    .catch(err => {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Giriş başarısız oldu.");
    });
};

export const verifyUser = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    
    setAuthToken(token);
    API.get("/verify")
      .then(res => {
        dispatch(setUser(res.data));
      })
      .catch(err => {
        console.error("Token verification failed:", err);
        localStorage.removeItem("token");
        setAuthToken(null);
      });
  }
};

export const fetchCreditCards = () => (dispatch) => {
    API.get("/user/card").then(res => { dispatch(setCreditCards(res.data)); }).catch(err => console.error("Kredi kartları alınamadı:", err));
};

export const fetchRoles = () => (dispatch) => {
    API.get("/roles").then(res => { dispatch(setRoles(res.data)); }).catch(err => console.error("Error fetching roles:", err));
};