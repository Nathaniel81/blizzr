/*eslint-disable*/
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { listOrders } from '../redux/actions/orderActions'


const OrderListPage = () => {
	
	const dispatch = useDispatch()
	const navigate  = useNavigate()

	const userLogin = useSelector(state => state.userInfo)
	const { user } = userLogin

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

	useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, user])

	return (
		<div className="mx-auto px-16 mt-28 overflow-x-auto">
		  <h1 className="text-2xl font-bold mb-4">Orders</h1>
	
		  {loading ? (
			<Loader />
		  ) : error ? (
			<Message variant='danger'>{error}</Message>
		  ) : (
			<div>
			  <table className='table'>
				<thead>
				  <tr>
					<th>ID</th>
					<th>User</th>
					<th>Date</th>
					<th>Total</th>
					<th>Paid</th>
					<th>Delivered</th>
				  </tr>
				</thead>
	
				<tbody>
				  {orders && orders.map(order => (
					<tr key={order.id} className='hover'>
					  <td className='px-4 py-2'>{order.id}</td>
					  <td className='px-4 py-2'>{order.user.username}</td>
					  <td>{order.createdAt.substring(0, 10)}</td>
					  <td className='px-4 py-2'>{order.totalPrice}</td>
                      <td>{order.isPaid ? (
                        // order.paidAt.substring(0, 10)
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        ) : (
							""
                        )}
                      </td>
                      <td>{order.isDelivered ? (
                        // order.deliveredAt.substring(0, 10)
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        ) : (
                        // <i className='fas fa-check' style={{ color: 'red' }}></i>
						""
                       )}
                      </td>
					  <td className='px-4 py-2'>
						<Link to={`/order/${order.id}`} className="btn">
							Detail
						</Link>
					  </td>
					</tr>
				  ))}
				</tbody>
			  </table>
			  {/* <Paginate pages={pages} page={page} isAdmin={true} keyword={queryString} /> */}
			</div>
		  )}
		{/* <div className='px-16 mx-auto'><Paginate page={page} pages={pages} keyword={queryString} /></div> */}
		</div>
	  );	
}
export default OrderListPage