import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { getOrderDetail, payOrder } from '../redux/actions/orderActions'
import { orderCreateReset } from '../redux/slices/orderSlices/orderCreateSlice'
import { orderPayReset } from '../redux/slices/orderSlices/orderPaySlice'
import { deliverOrder } from '../redux/actions/orderActions'
import { orderDeliverReset } from '../redux/slices/orderSlices/orderDeliverSlice'

const OrderPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams();
    const orderDetails = useSelector(state => state.orderDetail)
    const { orderItems:order, error, loading } = orderDetails

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const userLogin = useSelector(state => state.userInfo)
    const { user } = userLogin

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const [sdkReady, setSdkReady] = useState(false)

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=ARSAwBrnsoPldPewr2wudeBcE3MWvxAEDmgAhnpyXkIrXqzTNLZDOSUPlJphGQHV8hrlPwRfKt_65_Uz'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!user) {
          navigate('/login');
        }
        if (!order || order.id !== Number(id)|| successPay || successDeliver) {
          dispatch(getOrderDetail(id))
          dispatch(orderCreateReset())
          dispatch(orderPayReset())
          dispatch(orderDeliverReset())
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
       }
    }, [dispatch, navigate, user, order, successPay, successDeliver, id]);

    return loading ? (
      <Loader />
        ) : 
       error ? (
       <Message color={'bg-red-100'}>{error}</Message>
      ) :
        (
          <div className='mx-auto md:mt-20 mt-36 px-16'>
            <h1 className="text-2xl font-bold">Order: {order.id}</h1>
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="md:w-[65%] w-full mb-8 sm:mb-0 pr-4">
                <div className="divide-y divide-gray-200">
                  <div className="py-4">
                    <h2 className="text-xl font-bold py-3">SHIPPING</h2>
                    <p className="py-2">
                      <strong>Name: </strong> {order.user.username}
                    </p>
                    <p className="py-2">
                      <strong>Email: </strong>
                      <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p className="py-2">
                      <strong>Shipping: </strong>
                      {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                      {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <Message color={'bg-green-100'}>Delivered on {order.deliveredAt.substring(0, 10)}</Message>
                    ) : (
                      <Message color={'bg-yellow-100'}>Not Delivered</Message>
                    )}
                  </div>
                  <div className="py-4">
                    <h2 className="text-xl font-bold py-3">PAYMENT METHOD</h2>
                    <p className="py-2">
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <Message color={'bg-green-100'}>Paid on {order.paidAt.substring(0, 10)}</Message>
                    ) : (
                      <Message color={'bg-yellow-100'}>Not Paid</Message>
                    )}
                  </div>
                  <div className="py-4">
                    <h2 className="text-xl font-bold py-3">ORDER ITEMS</h2>
                    {order.orderItems.length === 0 ? (
                      <Message color={'bg-blue-100'}>Order is empty</Message>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {order.orderItems.map((item, index) => (
                          <div key={index} className={`flex items-center gap-1 mb-4 ${index !== order.orderItems.length - 1 ? 'border-b border-gray-300 pb-4' : ''}`}>
                            <div className="w-1/12">
                              <img src={item.image} alt={item.name} className="w-full rounded" />
                            </div>
                            <div className="w-8/12">
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </div>
                            <div className="w-3/12">
                            <span className="hidden md:inline">{item.qty} X ${item.price} = </span>
                               ${(item.qty * item.price).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[30%] card rounded shadow-md h-full p-5">
                  <div className='card'>
                      <div className="space-y-2">
                          <div>
                              <h2 className="text-xl font-bold">ORDER SUMMARY</h2>
                          </div>
                          <div className="flex justify-between py-1">
                              <div>
                                  <span>Items:</span>
                              </div>
                              {(order && !error && !loading) && (
                                  <div>${order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</div>
                              )}
                          </div>
                          <hr className='my-1'/>
                          <div className="flex justify-between py-1">
                              <div>
                                  <span>Shipping:</span>
                              </div>
                              <div>${order.shippingPrice}</div>
                          </div>
                          <hr className='my-1'/>
                          <div className="flex justify-between py-1">
                              <div>
                                  <span>Tax:</span>
                              </div>
                              <div>${order.taxPrice}</div>
                          </div>
                          <hr className='my-1'/>
                          <div className="flex justify-between py-1">
                              <div>
                                  <span>Total:</span>
                              </div>
                              <div>${order.totalPrice}</div>
                          </div>
                          {!order.isPaid && (
                              <div>
                                  {loadingPay && <Loader />}
                                  {!sdkReady ? (
                                      <Loader />
                                  ) : (
                                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                  )}
                              </div>
                          )}
                      </div>
                      {loadingDeliver && <Loader />}
                      {user && user.isAdmin && order.isPaid && !order.isDelivered && (
                          <div>
                              <button
                                  type="button"
                                  className="btn btn-block"
                                  onClick={deliverHandler}
                              >
                                  Mark As Delivered
                              </button>
                          </div>
                      )}
                  </div>
                </div>
            </div>
        </div>
    );  
  }

export default OrderPage
