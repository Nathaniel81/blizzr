// import React from 'react'
/*eslint-disable*/
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { fetchUserDetails , updateUserDetails } from '../redux/actions/userActions'
import { listUserOrders } from '../redux/actions/orderActions'
import { userUpdateReset } from '../redux/slices/userSlices/userUpdateSlice'
// import { getUserDetails, updateUserProfile } from '../actions/userActions'
// import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
// import { listMyOrders } from '../actions/orderActions'


const ProfilePage = () => {
	const navigate = useNavigate()
    const dispatch = useDispatch()

	const userDetails = useSelector(state => state.userDetail)
    const { error, loading, userDetail } = userDetails

    const userLogin = useSelector(state => state.userInfo)
    const { user:userInfo } = userLogin

	const userUpdateProfile = useSelector(state => state.userUpdate)
    const { success } = userUpdateProfile

	const orderListMy = useSelector(state => state.userOrders)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

	const [name, setName] = useState(userDetail && userDetail.username || '')
    const [email, setEmail] = useState(userDetail && userDetail.email || '')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

	useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
		
		if (userInfo) {
			if (!userDetail || userInfo.id !== userDetail.id || success) {
				console.log('fetching detail..')
				dispatch(fetchUserDetails('profile'))
				dispatch(userUpdateReset())
				dispatch(listUserOrders())
			} else {
				setName(userDetail.username)
				setEmail(userDetail.email)
			}
		}
        
    }, [dispatch, userDetail, userInfo, navigate, success])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
			dispatch(updateUserDetails({
				'id': userDetail.id,
				'username': name,
				'email': email,
				'password': password,
			}))
			setMessage('')
		}
	}

	return (
		<div>
		  <div className="flex flex-wrap justify-between mt-32 mx-auto px-16">
			<div className="md:w-1/4">
			  <h2 className="text-2xl font-bold">User Profile</h2>
			  {/* {message && <Message color={'alert-error'}>{message}</Message>}
			  {error && <Message color={'alert-error'}>{error}</Message>}
			  {loading && <Loader />} */}

			  <form onSubmit={submitHandler} className="mt-4">
				<div className="mb-4">
				  <label htmlFor='name' className="block text-sm font-medium text-gray-600">Name</label>
				  <input
					required
					type='name'
					placeholder='Enter name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="mt-1 p-2 w-full border rounded"
				  />
				</div>
				<div className="mb-4">
				  <label htmlFor='email' className="block text-sm font-medium text-gray-600">Email Address</label>
				  <input
					required
					type='email'
					placeholder='Enter Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="mt-1 p-2 w-full border rounded"
				  />
				</div>
				<div className="mb-4">
				  <label htmlFor='password' className="block text-sm font-medium text-gray-600">Password</label>
				  <input
					type='password'
					placeholder='Enter Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="mt-1 p-2 w-full border rounded"
				  />
				</div>
				<div className="mb-4">
				  <label htmlFor='passwordConfirm' className="block text-sm font-medium text-gray-600">Confirm Password</label>
				  <input
					type='password'
					placeholder='Confirm Password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					className="mt-1 p-2 w-full border rounded"
				  />
				</div>
				<button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">
				  Update
				</button>
			  </form>
			</div>
			<div className="md:w-8/12">
			  <h2 className="text-2xl font-bold">My Orders</h2>
			  {loadingOrders ? (
				<Loader />
			  ) : errorOrders ? (
				<Message variant='danger'>{errorOrders}</Message>
			  ) : (
				<table className='table-auto w-full mt-4'>
				  <thead>
					<tr>
					  <th className='border px-4 py-2'>ID</th>
					  <th className='border px-4 py-2'>Date</th>
					  <th className='border px-4 py-2'>Total</th>
					  <th className='border px-4 py-2'>Paid</th>
					  <th className='border px-4 py-2'>Delivered</th>
					</tr>
				  </thead>
				  <tbody>
					{orders && orders.map(order => (
					  <tr key={order.id}>
						<td className='border px-4 py-2'>{order.id}</td>
						<td className='border px-4 py-2'>{order.createdAt.substring(0, 10)}</td>
						<td className='border px-4 py-2 text-center'>${order.totalPrice}</td>
						<td className='border px-4 py-2 text-center'>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times text-red-500'></i>}</td>
						<td className='border px-4 py-2 text-center'>
						  <Link to={`/order/${order.id}`}>
							<button className='bg-blue-500 text-white px-2 py-1 rounded'>
							  Details
							</button>
						  </Link>
						</td>
					  </tr>
					))}
				  </tbody>
				</table>
			  )}
			</div>
		  </div>
		</div>
	  );
	  
}

export default ProfilePage