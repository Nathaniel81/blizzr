import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../redux/actions/orderActions'


const PlaceOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderCreate = useSelector(state => state.orderCreate);
    const { order, error, success } = orderCreate;
    const orderValues = useSelector(state => state.cart.orderValues);
    const cart = useSelector(state => state.cart);


    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: orderValues.itemsPrice,
            shippingPrice: orderValues.shippingPrice,
            taxPrice: orderValues.taxPrice,
            totalPrice: orderValues.totalPrice,
        }));
    };

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
        if (success) {
            navigate(`/order/${order.id}`);
        }
    }, [order, dispatch, success, navigate, cart, error]);

    return (
        <div className='mx-auto px-16'>
          <CheckoutSteps step1={'step-primary'} step2={'step-primary'} step3={'step-primary'} step4={'step-primary'}/>
          <div className="flex flex-col md:flex-row md:mt-14 mt-20 justify-between items-start">
            <div className="md:w-[65%] w-full mb-8 sm:mb-0 pr-4">
              <div className="py-5 border-b border-gray-300">
                <h2 className="md:text-2xl text-xl font-bold mb-2">SHIPPING</h2>
                <p className="mt-2 md:py-3 py-0">
                  <strong>Shipping: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>
              </div>
              <div className="py-5 border-b border-gray-300">
                <h2 className="md:text-2xl text-xl font-bold mb-2">PAYMENT METHOD</h2>
                <p className="mt-2 md:py-3 py-0">
                  <strong>Method: </strong>
                  {cart.paymentMethod}
                </p>
              </div>
              <div className="py-5">
                <h2 className="md:text-2xl text-xl font-bold mb-2 py-3">ORDER ITEMS</h2>
                {cart.cartItems.length === 0 ? (
                  <Message color={'bg-blue-100'}>
                    Your cart is empty <Link to='/' className='hover:underline'>Go Back</Link>
                  </Message>
                 ) 
                : (
                  <div className="mt-3 lg:w-[90%] w-full">
                    {cart.cartItems.map((item, index) => (
                      <div key={index} className={`flex items-center gap-1 mb-4 ${index !== cart.cartItems.length - 1 ? 'border-b border-gray-300 pb-4' : ''}`}>
                        <div className="w-12 sm:w-16">
                          <img src={item.image} alt={item.name} className="w-full" />
                        </div>
                        <div className="ml-2 sm:ml-4">
                          <Link to={`/product/${item.product}`} className="text-sm sm:text-base hover:underline">
                            {item.name}
                          </Link>
                        </div>
                        <div className="ml-auto text-sm sm:text-base">
                          <span className="hidden md:inline">{item.qty} X ${item.price} = </span>
                          {(item.qty * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

           <div className="w-full md:w-[30%] card rounded shadow-md h-full">
              <div className="m-4">
                <div className="mb-4 md:text-2xl text-xl font-bold">ORDER SUMMARY</div>
                {orderValues && (
                <div>
                  <div className="flex justify-between py-1 ">
                    <div>Items:</div>
                    <div>${orderValues.itemsPrice}</div>
                  </div>
                  <hr className='pt-2'/>
                  <div className="flex justify-between py-1">
                    <div>Shipping:</div>
                    <div>${orderValues.shippingPrice}</div>
                  </div>
                  <hr className='pt-2'/>
                  <div className="flex justify-between py-1">
                    <div>Tax:</div>
                    <div>${orderValues.taxPrice}</div>
                  </div>
                  <hr className='pt-2'/>
                  <div className="flex justify-between py-1">
                    <div>Total:</div>
                    <div>${orderValues.totalPrice}</div>
                  </div>
                </div>
                )}
                <div className="mt-4">
                  {error && <Message color={'bg-red-100'}>{error}</Message>}
                </div>
                <div className="mt-4">
                <button
                  type="button"
                  className="w-full btn"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </button>
               </div>
              </div>
            </div>
          </div>
        </div>
      );  
    };

export default PlaceOrderPage;
