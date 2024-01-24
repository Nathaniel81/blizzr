import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../Components/Message'
import CheckoutSteps from '../Components/CheckoutSteps'
import { createOrder } from '../redux/actions/orderActions'
import { orderCreateReset } from '../redux/slices/orderSlices/orderCreateSlice'
// /*eslint-disable*/
const PlaceorderPage = () => {
    const dispatch = useDispatch()
	const navigate = useNavigate()
	const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

	const cart = useSelector(state => state.cart)

	const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
	const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2)
	const taxPrice = Number((0.082) * itemsPrice).toFixed(2)
	const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

	const updatedCart = {
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice
    };

	useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment')
        }
        if (success) {
			console.log('Order Created', error)
            // navigate(`/order/${order.id}`)
            dispatch(orderCreateReset)
        }
    }, [order, dispatch, success, navigate, cart, error])

	const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: updatedCart.itemsPrice,
            shippingPrice: updatedCart.shippingPrice,
            taxPrice: updatedCart.taxPrice,
            totalPrice: updatedCart.totalPrice,
        }))
    }

	return (
		<div className='mx-auto px-16'>
          <CheckoutSteps step1 step2 step3 step4 />
        <div className="flex flex-wrap my-10">
			<div className="w-full sm:w-8/12 mb-8 sm:mb-0 pr-4">
              <div className="py-5">
				<h2 className="text-2xl font-bold">SHIPPING</h2>
				<p className="mt-2">
                <strong>Shipping: </strong>
				  {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
				</p>
			  </div>
			  <div className="py-5">
				<h2 className="text-2xl font-bold">PAYMENT METHOD</h2>
				<p className="mt-2">
				  <strong>Method: </strong>
				  {cart.paymentMethod}
				</p>
			  </div>
			  <div className="py-5">
				<h2 className="text-2xl font-bold">ORDER ITEMS</h2>
				{cart.cartItems.length === 0 ? (
				  <Message color={'alert-info'}>Your cart is empty <Link to='/' className='hover:underline'>  Go Back</Link></Message>
				) : (
				  <div className="mt-3 lg:w-[90%] w-full">
					{cart.cartItems.map((item, index) => (
					  <div key={index} className="flex items-center mb-4">
						<div className="w-16">
						  <img src={item.image} alt={item.name} className="w-full" />
						</div>
						<div className="ml-4">
						  <Link to={`/product/${item.product}`}>
							{item.name}
						  </Link>
						</div>
						<div className="ml-auto">
						  {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
						</div>
					  </div>
					))}
				  </div>
				)}
			  </div>
			</div>
			<div className="w-full sm:w-4/12 card rounded shadow-md h-full">
			  <div className="m-4">
				<div className="mb-4 text-2xl font-bold">ORDER SUMMARY</div>
				<div className="flex justify-between py-1 ">
				  <div>Items:</div>
				  <div>${updatedCart.itemsPrice}</div>
				</div>
				<hr className='pt-2'/>
				<div className="flex justify-between py-1">
				  <div>Shipping:</div>
				  <div>${updatedCart.shippingPrice}</div>
				</div>
				<hr className='pt-2'/>
				<div className="flex justify-between py-1">
				  <div>Tax:</div>
				  <div>${updatedCart.taxPrice}</div>
				</div>
				<hr className='pt-2'/>
				<div className="flex justify-between py-1">
				  <div>Total:</div>
				  <div>${updatedCart.totalPrice}</div>
				</div>
				<div className="mt-4">
				  {error && <Message color={'alert-error'}>{error}</Message>}
				</div>
				<div className="mt-4">
				  <button
					type="button"
					className="w-full bg-blue-500 text-white py-2 rounded"
					disabled={cart.cartItems.length === 0}
					onClick={placeOrder}
				  >
					PLACE ORDER
				  </button>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  );
	  
};

export default PlaceorderPage