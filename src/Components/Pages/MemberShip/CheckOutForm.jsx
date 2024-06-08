import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../../Authprovider/Authcontext";
import goldimage from '../../../image/images.jpeg'
import { toast } from "react-toastify";

const CheckOutForm = () => {
    const { user } = useContext(AuthProvider);
    const [error, setError] = useState('');
    const [client, setClient] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const data = { price: 100 }

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.clientSecret)
                setClient(data.clientSecret);
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(client, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        } else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                try {
                    const currentUser2 = {
                        email: user?.email,
                        role: 'Gold Badge',
                    }

                    fetch(`http://localhost:5000/payment`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(currentUser2)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.modifiedCount > 0 && data.upsertedCount > 0) {
                                toast.success('Succes ! Please wait for admin confirmation');
                            }
                            else {
                                toast.success('Please ! Wait for admin approval');
                            }
                        })
                }
                catch (err) {
                    console.log(err);
                }
            }
        }


    }
    return (
        <div className="bg-gray-300">
            <div className="text-center my-10">
                <h2 className="text-amber-500">-------------------------------------------------------------------------</h2>
                <h2 className="text-2xl font-bold my-3">Please Pay 10$ for our Membership</h2>
                <h2 className="text-amber-500">-------------------------------------------------------------------------</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary" type="submit" disabled={!stripe || !client}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
            </form>
            <div className="text-center">
                <h2 className="text-amber-500">-------------------------------------------------------------------------</h2>
                <h2 className="text-2xl font-bold my-3">Pay & Get Gold Badge</h2>
                <h2 className="text-amber-500">-------------------------------------------------------------------------</h2>
                <div className="flex justify-center">
                    <img className="rounded-full" src={goldimage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default CheckOutForm;