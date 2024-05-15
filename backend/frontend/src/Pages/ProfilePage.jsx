import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchUserDetails , updateUserDetails } from '../redux/actions/userActions';
import { listUserOrders } from '../redux/actions/orderActions';
import { userUpdateReset } from '../redux/slices/userSlices/userUpdateSlice';


const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetail);
    const { error, loading, userDetail } = userDetails;

    const userLogin = useSelector(state => state.userInfo);
    const { user:userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdate);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.userOrders);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    const [name, setName] = useState(userDetail && userDetail.username || '');
    const [email, setEmail] = useState(userDetail && userDetail.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }

        if (userInfo) {
          if (!userDetail || userInfo.id !== userDetail.id || success) {
            dispatch(fetchUserDetails('profile'));
            dispatch(userUpdateReset());
            dispatch(listUserOrders());
           } else {
            setName(userDetail.username);
            setEmail(userDetail.email);
           }
        }
    }, [dispatch, userDetail, userInfo, navigate, success]);

    const submitHandler = (e) => {
      e.preventDefault()
      if (password != confirmPassword) {
          setMessage('Passwords do not match');
      } else {
      dispatch(updateUserDetails({
        'id': userDetail.id,
        'username': name,
        'email': email,
        'password': password,
      }));
      setMessage('');
      }
    };

    return (
        <div>
          <div className="flex flex-wrap justify-between mt-10 mx-auto px-16">
              <div className="md:w-[30%] w-full">
                <h2 className="text-2xl font-bold">PROFILE</h2>
                {message && <Message color={'alert-error'}>{message}</Message>}
                {error && <Message color={'alert-error'}>{error}</Message>}
                {loading && <Loader />}
                <form onSubmit={submitHandler} className="mt-4">
                  <div className="mb-2 form-control w-full">
                    <div className="label">
                        <span className="label-text font-medium">Name</span>
                      </div>
                    <input
                     required
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-2 form-control w-full">
                    <div className="label">
                        <span className="label-text font-medium">Email</span>
                      </div>
                    <input
                     required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-2 form-control w-full">
                    <div className="label">
                        <span className="label-text font-medium">Password</span>
                      </div>
                    <input
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-2 form-control w-full">
                    <div className="label">
                        <span className="label-text font-medium">Confirm Password</span>
                      </div>
                    <input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input input-bordered w-full"
                    />
                  </div>
                  <button type='submit' className="btn w-full mb-10">
                    Update
                  </button>
                </form>
              </div>
              <div className="md:w-[65%] w-full">
                <h2 className="text-2xl font-bold mb-4">MY ORDERS</h2>
                {loadingOrders ? (
                <Loader />
                ) : errorOrders ? (
               <Message color={'bg-red-100'}>{errorOrders}</Message>
                ) : (
                <table className='table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th className="text-center">Total</th>
                      <th className="text-center">Paid</th>
                      <th className="text-center">Delivered</th>
                    </tr>
                  </thead>
                  <tbody>
                  {orders && orders.map(order => (
                    <tr key={order.id}>
                    <td className='px-4 py-2'>{order.id}</td>
                    <td className='px-4 py-2'>{order.createdAt.substring(0, 10)}</td>
                    <td className='px-4 py-2 text-center'>${order.totalPrice}</td>
                    <td className='px-4 py-2 text-center'>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times text-red-500'></i>}</td>
                    <td className='px-4 py-2 text-center'>
                    <Link to={`/order/${order.id}`}>
                      <button className='btn'>
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
};

export default ProfilePage;
