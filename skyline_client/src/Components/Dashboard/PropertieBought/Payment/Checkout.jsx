import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { axiosSecure } from "../../../../CustomHook/AxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

function Checkout() {
    const [err, setEror] = useState(null)
    const [clientSecret, setClientSecret] = useState('')
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const stripe = useStripe()
    const elements = useElements()
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axiosSecure.post(`/payment-intent`, { id })
            .then((d) => setClientSecret(d.data.clientSecret));
    }, [id]);
    const handleSubmit = async (event) => {
        event.preventDefault();

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
        //payment
        const { paymentIntent, error: ConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                }
            }
        })

        if (ConfirmError) {
            console.log("Confirm Error!");
        } else {
            console.log("Payment Intent", paymentIntent);
            const tid = paymentIntent.id
            toast.success("Payment Successfull")
            try {
                await axiosSecure.patch(`/paymentsuccess`, { id, tid })
                // .then(() => {
                console.log("successfull");
                navigate('/')
                // })
                // .catch(e => console.log(e.message))
            } catch (error) {
                console.log(error.message);
            }
        }

        if (error) {
            console.log('[error]', error);
            setEror(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setEror('')
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement className=" bg-slate-100 p-4"
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
                <p className=" text-red-500 font-semibold">{err}</p>
                <button className="btn btn-success my-2 px-5" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </>
    );
}

export default Checkout;