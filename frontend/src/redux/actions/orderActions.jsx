import axios from "axios";
import { 
	orderCreateStart, 
	orderCreateSuccess, 
	orderCreateFailure, 
} from "../slices/orderSlices/orderCreateSlice";
import { cartClearItems } from "../slices/cartSlices/addToCartSlice";
import { 
	orderDetailsRequest,
	orderDetailsSuccess, 
	orderDetailsFailure 
} from "../slices/orderSlices/orderDetailSlice";
import { 
	orderPayStart, 
	orderPaySuccess, 
	orderPayFailure 
} from "../slices/orderSlices/orderPaySlice";

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch(orderCreateStart());

		const {
            userInfo: { user },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

		const { data } = await axios.post(`/api/orders/add/`,
		order,
		config,
		)

		dispatch(orderCreateSuccess(data));
		dispatch(cartClearItems())
		localStorage.removeItem('cartItems')
	} catch (error) {
		dispatch(orderCreateFailure(error));
	}
  };

  export const getOrderDetail = (id) => async (dispatch, getState) => {
	try {
		dispatch(orderDetailsRequest());

		const {
            userInfo: { user },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

		const { data } = await axios.get(`/api/orders/${id}`,
		config,
		)

		dispatch(orderDetailsSuccess(data));
		
	} catch (error) {
		dispatch(orderDetailsFailure())
	}
  };

  export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch(orderPayStart())

        const {
            userInfo: { user },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
		}

        const { data } = await axios.put(
            `http://127.0.0.1:8000/api/orders/${id}/pay`,
            paymentResult,
            config
        )

        dispatch(orderPaySuccess(data))

    } catch (error) {
        dispatch(orderPayFailure())
    }
}

