// /*eslint-disable*/
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/actions/cartActions';
import CheckoutSteps from '../Components/CheckoutSteps';


const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart || {};
  const { address: initialAddress, city: initialCity, postalCode: initialPostalCode, country: initialCountry } = shippingAddress || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(initialAddress || '');
  const [city, setCity] = useState(initialCity || '');
  const [postalCode, setPostalCode] = useState(initialPostalCode || '');
  const [country, setCountry] = useState(initialCountry || '');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <>
      <CheckoutSteps step1={'step-primary'} step2={'step-primary'}></CheckoutSteps>
      <h1 className="text-2xl font-bold pb-3 max-w-md mx-auto mt-14">SHIPPING</h1>
      <div className='max-w-md mx-auto p-6 card rounded shadow-md'>
      <form onSubmit={submitHandler} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 input input-bordered"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input input-bordered w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="input input-bordered w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input input-bordered w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Continue
        </button>
      </form>
      </div>
    </>
  );
};

export default ShippingScreen;
