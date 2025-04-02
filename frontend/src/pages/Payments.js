import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';
import Razorpay from 'razorpay';

const Payments = () => {
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const history = useHistory();

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Backend se payment order create karna
            const response = await api.post('/api/payment/create-order');
            const { orderId, amount } = response.data;

            // Razorpay payment window open karna
            const options = {
                key: 'YOUR_RAZORPAY_KEY', // Razorpay API Key
                amount: amount, // Amount in smallest currency unit (e.g., paise)
                currency: 'INR',
                name: 'SSC Mock Test Subscription',
                description: 'Subscribe to SSC Mock Test',
                order_id: orderId,
                handler: async (response) => {
                    // Payment successful
                    const paymentDetails = {
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    // Payment status update karna backend me
                    await api.post('/api/payment/verify-payment', paymentDetails);
                    setPaymentStatus('Payment Successful!');
                    history.push('/dashboard'); // User ko dashboard pe redirect karna
                },
                prefill: {
                    name: 'User Name', // User ka naam
                    email: 'user@example.com', // User ka email
                    contact: '9999999999', // User ka contact number
                },
                theme: {
                    color: '#61dafb',
                },
            };

            const paymentObject = new Razorpay(options);
            paymentObject.open();
        } catch (error) {
            setLoading(false);
            setPaymentStatus('Payment Failed. Please try again.');
            console.error('Error during payment:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Subscription Payment</h2>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
                <div className="flex space-x-4">
                    <div className="w-1/3 border p-4 rounded-lg">
                        <h4 className="text-lg font-medium">Basic Plan</h4>
                        <p className="text-gray-500">₹10/year</p>
                    </div>
                    <div className="w-1/3 border p-4 rounded-lg bg-blue-100">
                        <h4 className="text-lg font-medium">Premium Plan</h4>
                        <p className="text-gray-500">₹100/year</p>
                    </div>
                    <div className="w-1/3 border p-4 rounded-lg">
                        <h4 className="text-lg font-medium">Ultimate Plan</h4>
                        <p className="text-gray-500">₹500/year</p>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={handlePayment}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                </div>

                {paymentStatus && (
                    <div className="mt-4 text-center">
                        <p className={paymentStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}>
                            {paymentStatus}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payments;
