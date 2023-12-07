import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import { Toaster } from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_PAY_PUBLIC_KEY)
function Payment() {
    return (
        <>
            <Toaster
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 2000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}></Toaster>
            <div className=" bg-slate-200 h-screen">
                <div className=" w-full py-10">
                    <p className=" w-fit mx-auto text-2xl font-bold">PAYMENT</p>
                </div>
                <div className="w-2/4 mx-auto">
                    <Elements stripe={stripePromise}>
                        <Checkout></Checkout>
                    </Elements>
                </div>
            </div>
        </>
    );
}

export default Payment;