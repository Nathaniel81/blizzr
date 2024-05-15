import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { updateUser, fetchUserDetails } from '../redux/actions/userActions';
import { userUpdateAdminReset } from '../redux/slices/userSlices/userUpdateAdminSlice';


const UserEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetail);
    const { error, loading, userDetail:user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdateAdmin);
    const { 
      error: errorUpdate, 
      loading: loadingUpdate, 
      success: successUpdate 
    } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch(userUpdateAdminReset())
            navigate('/admin/users')
        } else {
            if (!user || user.id !== Number(id)) {
                dispatch(fetchUserDetails(id))
            } else {
                setUsername(user.username)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    //eslint-disable-next-line
    }, [user, id, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ id: user.id, username, email, isAdmin }))
    }

    return (
        <div className="px-16 mx-auto mt-1 mb-2">
          <button onClick={() => navigate(-1)} className="btn btn-ghost mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
              Go Back
          </button>
    
          <div className='mt-4'>
            <h1 className='text-2xl font-bold'>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
    
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <form onSubmit={submitHandler} className='mt-4'>
                <div className='mb-4'>
                  <label htmlFor='username' className='block text-sm font-medium text-gray-600'>
                    username
                  </label>
                  <input
                    type='text'
                    id='username'
                    placeholder='Enter username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500'
                  />
                </div>
    
                <div className='mb-4'>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-600'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500'
                  />
                </div>
    
                <div className='mb-4'>
                  <input
                    type='checkbox'
                    id='isadmin'
                    className='mr-2 focus:ring-blue-500'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <label htmlFor='isadmin' className='text-sm font-medium text-gray-600'>
                    Is Admin
                  </label>
                </div>
    
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                  Update
                </button>
              </form>
            )}
          </div>
        </div>
      );
};

export default UserEditPage;
