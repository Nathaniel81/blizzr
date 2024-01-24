import axios from "axios";
import { 
	orderCreateStart, 
	orderCreateSuccess, 
	orderCreateFailure, 
} from "../slices/orderSlices/orderCreateSlice";
import { cartClearItems } from "../slices/cartSlices/addToCartSlice";

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
