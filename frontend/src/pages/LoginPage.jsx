import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchUserInfo } from '../redux/actions/userActions';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userInfo);
  const { error, loading, user } = userLogin;


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchUserInfo(username, password));
  };

  useEffect(() => {
    if (user && user.token) {
      navigate('/');
  }
}, [navigate, user]);

  return (
    <div className="max-w-md mx-auto md:mt-28 mt-20 p-6 mb-28 card rounded shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Sign In</h1>
      {error && <Message color={'bg-red-100'}>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className="mb-4 form-control w-full">
          <div className="label">
            <span className="label-text font-medium">Username</span>
          </div>
          <input
            type="text"
            id="username"
            className="input input-bordered w-full"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 form-control w-full">
          <div className="label">
            <span className="label-text font-medium">Password</span>
          </div>
          <input
            type="password"
            id="password"
            className="input input-bordered w-full"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full btn"
        >
          Sign In
        </button>
      </form>

      <div className="py-3 text-center">
        <p>
          New Customer? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
