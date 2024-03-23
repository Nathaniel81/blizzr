import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { saveOrderValues } from '../redux/slices/cartSlices/addToCartSlice';
import { logout } from '../redux/actions/userActions';
import SearchBox from './SearchBox';
import { AiOutlineUser } from "react-icons/ai"


const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userInfo)
  const { user } = userLogin

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  const orderValues = useSelector(state => state.cart.orderValues)


  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  const logoutHandler = () => {
    dispatch(logout())
  };

  useEffect(() => {
    dispatch(saveOrderValues())
  }, [dispatch, cartItems]);

  return (
    <div className="h-20 sticky md:px-16 mx-auto z-10 top-0 bg-zinc-100 border-b border-zinc-300 py-2">
      <div className="h-full flex items-center md:gap-x-5 justify-between md:justify-start">
        <div className="flex justify-between items-center">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </div>
              <ul tabIndex={0} onClick={handleClick} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Shop</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><a>Contact</a></li>
              </ul>
            </div>
            <a className="md:text-2xl sm:text-xl xs:text-l font-extrabold px-1 md:px-2">BLIZZR</a>
          </div>
        {/* Search Field */}
        <SearchBox />
        <div className='flex items-center justify-between md:gap-3'>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {cartItems.length !== 0 && (
                  <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                )}
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                {cartItems.length > 1 ? (
                  <span className="font-bold text-lg">{cartItems.length} Items</span>
                ): (
                  <span className="font-bold text-lg">{cartItems.length} Item</span>
                )}
                <span className="text-info">Subtotal: {orderValues && (
                 `$${orderValues.subtotal}`
                )}</span>
                <div className="card-actions" onClick={handleClick}>
                  <Link to='/cart' className="btn btn-block">View cart</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="">
              <AiOutlineUser className="text-2xl" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to='/profile' className="justify-between" onClick={handleClick}>
                Profile
              </Link>
            </li>
            {user && user.isAdmin && (
              <li>
                <details>
                  <summary>
                    Admin
                  </summary>
                  <ul className="p-2 bg-base-100 rounded-t-none" onClick={handleClick}>
                    <li><Link to="/admin/users">Users</Link></li>
                    <li><Link to="/admin/productlist">Products</Link></li>
                    <li><Link to="/admin/orderlist">Orders</Link></li>
                  </ul>
                </details>
              </li>
            )}
            {user ? (
              <li onClick={logoutHandler} ><Link onClick={handleClick}>Logout</Link></li>
            ):(
              <li onClick={handleClick}><Link to='/login'>Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )}

export default Header
