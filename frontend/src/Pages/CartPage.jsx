/*eslint-disable */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Message from '../Components/Message';
// import { addToCart, removeFromCart } from '../actions/cartActions'
const cartItems = [1, 4]
const checkoutHandler = [1, 3]
const removeFromCartHandler = [1, 3, 4]

const ShoppingCart = () => {
  return (
    <div className="mx-auto mt-20 px-16">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="md:w-[65%] w-full">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">
              Your cart is empty <Link to="/" className="text-blue-500 hover:underline">Go Back</Link>
            </p>
          ) : (
            <ul className="list-none p-0">
              {cartItems.map((item) => (
                <li key={item.product} className="mb-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-1/6">
                      <img src={item.image} alt={item.name} className="w-full h-auto" />
                    </div>
                    <div className="w-2/6">
                      <Link to={`/product/${item.product}`} className="text-blue-500 hover:underline">{item.name}</Link>
                    </div>
                    <div className="w-1/6">
                      ${item.price}
                    </div>
                    <div className="w-2/6">
                      <select
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        className="block w-full border rounded py-1 px-2 leading-tight focus:outline-none focus:border-blue-500"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/6">
                      <button
                        type='button'
                        className='text-red-500 hover:text-red-700 focus:outline-none'
                        onClick={() => removeFromCartHandler(item.product)}
                      >X
                        <i className='fas fa-trash'></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="md:w-[30%] w-full flex items-center justify-center">
          <div className="p-6 bg-white rounded shadow-md w-full">
            <ul className="list-none p-0">
              <li className="mb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </li>
              <li className="text-center my-3">
                <button
                  type='button'
                  className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
