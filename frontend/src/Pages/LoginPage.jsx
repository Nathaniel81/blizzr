/*eslint-disable*/
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { fetchUserInfo } from '../redux/actions/userActions';
// import FormContainer from '../components/FormContainer';
// import { login } from '../actions/userActions';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const redirect = new URLSearchParams(location.search).get('redirect') || '/';
  const userLogin = useSelector(state => state.userInfo);
  const { error, loading, user } = userLogin;


  const submitHandler = (e) => {
    e.preventDefault();
	  dispatch(fetchUserInfo(username, password));
  };

  useEffect(() => {
	if (user && user.token) {
		navigate('/'); //ASTK
	}
}, [navigate, user]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 text-sm font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
