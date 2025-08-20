import { toast } from "react-toastify";
import API from "../../api/axios";
import { clearCart } from "./shoppingCartActions";
import { SET_ORDERS, SET_ORDER_FETCH_STATE } from "./actionTypes";

export const setOrders = (orders) => ({ type: SET_ORDERS, payload: orders });
export const setOrderFetchState = (fetchState) => ({ type: SET_ORDER_FETCH_STATE, payload: fetchState });

export const fetchOrders = () => (dispatch) => {
  dispatch(setOrderFetchState("FETCHING"));
  API.get("/order")
    .then(res => {
      dispatch(setOrders(res.data));
      dispatch(setOrderFetchState("FETCHED"));
    })
    .catch(err => {
      
      dispatch(setOrderFetchState("FAILED"));
    });
};

export const createOrder = (orderData, history, setLoading) => (dispatch, getState) => {
  const { shopping } = getState();
  const { cart, address, payment } = shopping;
  const productsPayload = cart.filter(item => item.checked).map(item => ({ product_id: item.product.id, count: item.count, detail: item.product.description }));
  const requestPayload = { address_id: address.id, order_date: new Date().toISOString(), card_no: payment.card_no, card_name: payment.name_on_card, card_expire_month: payment.expire_month, card_expire_year: payment.expire_year, card_ccv: orderData.card_ccv, price: cart.filter(item => item.checked).reduce((total, item) => total + item.count * item.product.price, 0), products: productsPayload };
  
  API.post("/order", requestPayload)
    .then(res => {
      toast.success("Siparişiniz başarıyla oluşturuldu!");
      dispatch(clearCart());
      history.push('/order-success');
    })
    .catch(err => {
      
      toast.error("Sipariş oluşturulurken bir hata oluştu.");
    })
    .finally(() => {
      if (setLoading) {
        setLoading(false);
      }
    });
};