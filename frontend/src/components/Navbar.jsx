import { useState } from 'react'
import {BsChevronCompactUp} from "react-icons/bs"
import SearchBar from './SearchBar'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { saveOrderValues } from '../redux/slices/cartSlices/addToCartSlice';
import { logout } from '../redux/actions/userActions';
import { AiOutlineUser } from "react-icons/ai"
import { fetchCategories } from '../redux/actions/productActions'


const Navbar = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userInfo);
    const { user } = userLogin;
  
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
  
    const orderValues = useSelector(state => state.cart.orderValues);
    const [showNav, setShowNav] = useState(false);
  
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

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);
  

  return (
    <div className='h-20 sticky px-4 md:px-16 mx-auto z-10 shadow-sm top-0 bg-gray-50'>
      <div className='flex items-center justify-between py-4 relative'>
        <div className='flex items-center'>
          <div className='avatar w-12'>
            <Link to="/" className='flex items-center'>
              <img src="/static/images/logo.png" alt="" />
              <span className='hidden xl:inline-block font-extrabold'>BLIZZR</span>
            </Link>
          </div>
        </div>
        <div className='max-md:hidden w-[70%]'>
          <SearchBar/>
        </div>
        <div className='flex items-center space-x-4'>
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
            <span onClick={() => setShowNav(!showNav)} className='p-[9px] bg-gray-100 rounded-full md:hidden'>
                <BsChevronCompactUp className={`transition ease-in duration-150 ${showNav ? "rotate-180":"0"}`} />
            </span>
        </div>
      </div>
      <div className={`md:hidden ${showNav ? "pb-4 px-5 bg-gray-50": "h-0 invisible opacity-0"}`}>
        <ul className='flex flex-col text-[15px] opacity-75 px-2'>
          <li><Link to="/" className='py-3 inline-block w-full'>Home</Link></li>
          <li><Link to="/" onClick={logoutHandler} className='py-3 inline-block w-full'>Logout</Link></li>
        </ul>
        <div className='flex items-center bg-gray-100 p-2 rounded-lg my-4 py-3'>
          <SearchBar/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
