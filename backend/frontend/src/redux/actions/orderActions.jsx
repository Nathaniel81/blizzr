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
import { 
    orderUserListRequest, 
    orderUserListSuccess, 
    orderUserListFailure 
} from "../slices/orderSlices/orderUserListSlice";
import { 
    orderDeliverRequest, 
    orderDeliverSuccess, 
    orderDeliverFailure 
} from "../slices/orderSlices/orderDeliverSlice";
import { 
    orderListRequest, 
    orderListSuccess, 
    orderListFailure 
} from "../slices/orderSlices/orderListSlice";
import { clearOrderValues } from "../slices/cartSlices/addToCartSlice";


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
        dispatch(clearOrderValues())
		localStorage.removeItem('cartItems')
	} catch (error) {
		dispatch(orderCreateFailure(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ));
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
		dispatch(orderDetailsFailure(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ))
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
            `/api/orders/${id}/pay`,
            paymentResult,
            config
        )

        dispatch(orderPaySuccess(data))

    } catch (error) {
        dispatch(orderPayFailure(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ))
    }
}

export const listUserOrders = () => async (dispatch, getState) => {
    try {
        dispatch(orderUserListRequest())

        const {
            userInfo: { user },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
		}

        const { data } = await axios.get(
            `/api/orders/myorders`,
            config
        )

        dispatch(orderUserListSuccess(data))

    } catch (error) {
        dispatch(orderUserListFailure(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ))
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(orderDeliverRequest())

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
            `/api/orders/${order.id}/deliver`,
            {},
            config
        )

        dispatch(orderDeliverSuccess(data))

    } catch (error) {
        dispatch(orderDeliverFailure(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ))
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch(orderListRequest())

        const {
            userInfo: { user },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/`,
            config
        )

        dispatch(orderListSuccess(data))

    } catch (error) {
        dispatch(orderListFailure(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ))
    }
}
