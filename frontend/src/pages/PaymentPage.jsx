import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../redux/actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


const PaymentScreen = () => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    if (!shippingAddress.address) {
        navigate('/shipping');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <CheckoutSteps step1={'step-primary'} step2={'step-primary'} step3={'step-primary'} />
            <h1 className="text-2xl font-bold pb-3 max-w-md mx-auto md:mt-14 mt-20">SELECT METHOD</h1>
            <form onSubmit={submitHandler} className="max-w-md mx-auto my-6">
                <div className="mb-4">
                    <div className="mt-1">
                        <label className="inline-flex items-center">
                            <input
                            type="radio" 
                            name="radio-1" 
                            className="radio radio-primary"
                            onChange={() => setPaymentMethod('PayPal')}
                            checked 
                            />
                            <span className="ml-2">PayPal or Credit Card</span>
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn">
                    Continue
                </button>
            </form>
        </div>
    )
};

export default PaymentScreen;
