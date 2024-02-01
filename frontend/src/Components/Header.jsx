import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { saveOrderValues } from '../redux/slices/cartSlices/addToCartSlice';
import { logout } from '../redux/actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const [theme, setTheme] = useState('light');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userInfo)
  const { user } = userLogin

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  const orderValues = useSelector(state => state.cart.orderValues)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(saveOrderValues())
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme, dispatch, cartItems]);

  return (
    <div className="navbar fixed bg-base-100 md:px-16 mx-auto z-10 top-0">
      <div className="flex justify-between w-full">
        <div className="flex justify-between items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} onClick={handleClick} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="/login">About</Link></li>
              <li><a>Contact</a></li>
            </ul>
          </div>
          <a className="md:text-2xl sm:text-xl xs:text-l font-extrabold px-1 md:px-2">BLIZZR</a>
        </div>
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
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img 
                  alt="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"  
                  src="/images/avatar.svg"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <label className="swap swap-rotate">
                      <input type="checkbox" onChange={toggleTheme} className="theme-controller" value="synthwave" />
                        <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                        <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                  </label>
                </li>
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
    </div>
  )
}

export default Header
