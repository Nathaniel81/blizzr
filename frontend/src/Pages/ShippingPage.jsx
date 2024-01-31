import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/actions/cartActions';
import CheckoutSteps from '../Components/CheckoutSteps';


const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart || {};
  const { 
    address: initialAddress, 
    city: initialCity, 
    postalCode: initialPostalCode, 
    country: initialCountry 
  } = shippingAddress || {};

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
      <h1 className="text-2xl font-bold pb-3 max-w-md mx-auto md:mt-14 mt-20">SHIPPING</h1>
      <div className='max-w-md mb-5 mx-auto p-6 card rounded shadow-md'>
      <form onSubmit={submitHandler}>
        <div className="mb-4 form-control w-full">
          <div className="label">
            <span className="label-text font-medium">Address</span>
          </div>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <div className="label">
            <span className="label-text font-medium">City</span>
          </div>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <div className="label">
            <span className="label-text font-medium">Postal Code</span>
          </div>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <div className="label">
            <span className="label-text font-medium">Country</span>
          </div>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="w-full btn">
          CONTINUE
        </button>
      </form>
      </div>
    </>
  );
};

export default ShippingScreen;
