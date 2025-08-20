import axios from "axios";

const API = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = token;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;