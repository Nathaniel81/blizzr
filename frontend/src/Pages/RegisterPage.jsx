import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { useNavigate, useLocation } from 'react-router-dom'
import { register } from '../redux/actions/userActions'

const RegisterPage = () => {
  const dispatch = useDispatch()
	const navigate = useNavigate()
	const userLogin = useSelector(state => state.userInfo);
	const { error, loading, user } = userLogin;

  const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [message, setMessage] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery()
  const redirect = query.get('redirect')
  console.log(redirect)

  const submitHandler = (e) => {
		e.preventDefault();
		if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password, confirmPassword))
        }
	}

  useEffect(() => {
    if (user && user.token) {
        navigate(redirect);
    }
  }, [navigate, user, redirect]);

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <form onSubmit={submitHandler} className="bg-white shadow-md rounded p-8">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <div className="mb-4">
              <label htmlFor='name' className="block text-sm font-medium text-gray-600">Name</label>
              <input
                required
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='email' className="block text-sm font-medium text-gray-600">Email Address</label>
              <input
                required
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='password' className="block text-sm font-medium text-gray-600">Password</label>
              <input
                required
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='passwordConfirm' className="block text-sm font-medium text-gray-600">Confirm Password</label>
              <input
                required
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded my-5">
              Register
            </button>
          </form>
          <div className="mt-3 text-center">
            <span className="text-gray-600">Have an Account? </span>
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default RegisterPage