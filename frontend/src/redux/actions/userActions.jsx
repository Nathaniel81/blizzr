import { userLoginRequest, userLoginSuccess, userLoginFailure } from "../slices/userSlices/userInfoSlice";
import axios from "axios";


export const fetchUserInfo = (username, password) => async (dispatch) => {
	try {
		dispatch(userLoginRequest());
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}
		const { data } = await axios.post(`/api/users/login`,
		{ username, password },
		config,
		)
		dispatch(userLoginSuccess(data));
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch(userLoginFailure(error));
	}
  };
