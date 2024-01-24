import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../redux/actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'

const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <div className="container mx-auto p-4">
            <CheckoutSteps step1={'step-primary'} step2={'step-primary'} step3={'step-primary'} />

            <form onSubmit={submitHandler} className="max-w-md mx-auto my-6">
                <div className="mb-4">
                    <label className="block text-2xl font-bold text-gray-700 py-4 mt-4">
                        SELECT METHOD
                    </label>
                    <div className="mt-1">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio h-5 w-5 text-blue-600"
                                checked
                                onChange={() => setPaymentMethod('PayPal')}
                            />
                            <span className="ml-2">PayPal or Credit Card</span>
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Continue
                </button>
            </form>
        </div>
    )
}

export default PaymentScreen
