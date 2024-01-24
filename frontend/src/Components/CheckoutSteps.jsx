/*eslint-disable*/
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex items-center justify-center mt-32">
      <ul className="steps text-md w-2/5 mx-auto">
        <li className={`step ${step1 ? 'step-primary' : ''}`}>
          {step1 ? (
            <Link to="/login" className='hover:underline'>Login</Link>
          ) : (
            <span className="text-gray-500 cursor-not-allowed">Login</span>
          )}
        </li>
        <li className={`step ${step2 ? 'step-primary' : ''}`}>
          {step2 ? (
            <Link to="/shipping">Shipping</Link>
          ) : (
            <span className="text-gray-500 cursor-not-allowed">Shipping</span>
          )}
        </li>
        <li className={`step ${step3 ? 'step-primary' : ''}`}>
          {step3 ? (
            <Link to="/payment">Payment</Link>
          ) : (
            <span className="text-gray-500 cursor-not-allowed">Payment</span>
          )}
        </li>
        <li className={`step ${step4 ? 'step-primary' : ''}`}>
          {step4 ? (
            <Link to="/placeorder">Place Order</Link>
          ) : (
            <span className="text-gray-500 cursor-not-allowed">Place Order</span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default CheckoutSteps;
