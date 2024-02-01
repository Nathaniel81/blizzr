import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { register } from '../redux/actions/userActions'


const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userInfo);
  const { error, loading, user } = userLogin;

  const userRegister = useSelector(state => state.userRegister);
  const { errorRegister, loadingRegister } = userRegister;

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")  

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery()
  const redirect = query.get('redirect') ?? '/';

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
        <div className="w-full md:w-1/2 lg:w-1/3 mt-20 mb-10">
          <form onSubmit={submitHandler} className="bg-white shadow-md rounded p-8">
            <h1 className="mb-4 text-2xl font-bold">Sign Up</h1>
            {message && <Message color={'bg-red-100'}>{message}</Message>}
            {errorRegister || error && <Message color={'bg-red-100'}>{errorRegister}</Message>}
            {loadingRegister || loading && <Loader />}
            <div className="mb-2 form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Name</span>
              </div>
              <input
                required
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-2 form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Email Address</span>
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
                required
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
                required
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <button type='submit' className="w-full btn">
              Register
            </button>
            <div className="mt-3 text-center">
              <span className="text-gray-600">Have an Account? </span>
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-blue-500">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage
