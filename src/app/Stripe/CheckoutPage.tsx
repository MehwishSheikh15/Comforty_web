// 'use client'
// import { useState, useEffect, Suspense } from 'react'
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
// import convertToSubCurrency from '@/app/lib/ConvertToSubCurrency'



// const CheckoutPage = ({ amount }: { amount: number }) => {
//     console.log(window.location.host)

//     const myhost = window.location.host
//     let URL = '';

//     if (myhost === 'localhost:3000') {
//         URL = 'http://localhost:3000'
//     }
//     else {
//         URL = 'https://comforty-app.vercel.app/';
//     }

//     const stripe = useStripe()
//     const elements = useElements()

//     const [errorMessage, setError] = useState<string>()
//     const [clientSecret, setClientSecret] = useState('')
//     const [loading, setLoading] = useState(false)


//     // as the payment method changes it is necessary to generate a new client secret.
//     useEffect(() => {
//         fetch('api/payment-intent', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ amount: convertToSubCurrency(amount) })
//         })

//             .then(res => res.json())
//             .then(data => setClientSecret(data.clientSecret))
//     }, [amount])

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         setLoading(true)

//         // Error handling
//         if (!stripe || !elements) {
//             return
//         }

//         const { error: submitErrors } = await elements.submit()
//         if (submitErrors) {
//             setError(submitErrors.message)
//             setLoading(false)
//             return
//         }

//         const { error } = await stripe.confirmPayment({
//             elements,
//             clientSecret,
//             confirmParams: {
//                 return_url: `${URL}/payment-success?amount`
//             }
//         })

//         if (error) {
//             setError(error.message)
//         }
//         else {
//             setError('')
//             setLoading(false)
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} className='p-8'>
//             {clientSecret && <PaymentElement />}
//             <button className='w-full bg-teal-600 text-white py-2 mt-5'>Pay Now</button>
//         </form>
//     )
// }

// export default CheckoutPage

// "use client";

// import { useState, useEffect } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import convertToSubCurrency from "@/app/lib/ConvertToSubCurrency";

// interface CheckoutPageProps {
//   amount: number;
//   onPaymentSuccess: () => void; // Callback when payment succeeds
// }

// const CheckoutPage: React.FC<CheckoutPageProps> = ({ amount, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [errorMessage, setError] = useState<string | null>(null);
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);

//   const myHost = typeof window !== "undefined" ? window.location.host : "";
//   const URL = myHost === "localhost:3000" ? "http://localhost:3000" : "https://comforty-web-nx82.vercel.app/";

//   // Fetch Client Secret for Stripe Payment Intent
//   useEffect(() => {
//     fetch("/api/payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret))
//       .catch((err) => setError("Failed to fetch payment details. Try again."));
//   }, [amount]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       setError("Stripe has not loaded yet. Please try again.");
//       setLoading(false);
//       return;
//     }

//     // ✅ First, submit the elements before confirming payment
//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       setError(submitError.message ?? "An unknown error occurred."); // ✅ Fix applied here
//       setLoading(false);
//       return;
//     }

//     // ✅ If elements.submit() succeeds, proceed to confirm payment
//     const { error } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: { return_url: `${URL}/payment-success?amount=${amount}` },
//     });

//     if (error) {
//       setError(error.message ?? "Payment failed. Please try again."); // ✅ Fix applied here
//       setLoading(false);
//       return;
//     }

//     // ✅ Retrieve Payment Intent to verify success
//     const paymentIntentResult = await stripe.retrievePaymentIntent(clientSecret);
//     const paymentIntent = paymentIntentResult.paymentIntent;

//     if (paymentIntent?.status === "succeeded") {
//       setError(null);
//       setLoading(false);
//       onPaymentSuccess(); // Call success handler
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-8">
//       {clientSecret && <PaymentElement />}
//       {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
//       <button
//         type="submit"
//         disabled={loading || !stripe}
//         className="w-full bg-teal-600 text-white py-2 mt-5"
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//     </form>
//   );
// };

// export default CheckoutPage;

"use client";

import { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/app/lib/ConvertToSubCurrency";

interface CheckoutPageProps {
  amount: number;
  cartItems: any[]; // Array of cart items
  customer: any; // Customer details
  onPaymentSuccess: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ amount, cartItems, customer, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const myHost = typeof window !== "undefined" ? window.location.host : "";
  const URL = myHost === "localhost:3000" ? "http://localhost:3000" : "https://comforty-app.vercel.app/";

  // Fetch Client Secret for Stripe Payment Intent
  useEffect(() => {
    fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(() => setError("Failed to fetch payment details. Try again."));
  }, [amount]);

  const saveOrderToSanity = async () => {
    try {
      const orderData = {
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
        },
        products: cartItems.map((item) => ({
          _id: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: amount,
        paymentMethod: "Stripe",
        paymentStatus: "Paid",
        orderDate: new Date().toISOString(),
        status: "Processing",
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to save order");

      console.log("✅ Order saved successfully in Sanity!");
    } catch (error) {
      console.error("❌ Error saving order:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      setLoading(false);
      return;
    }

    // Submit the elements before confirming payment
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "An unknown error occurred.");
      setLoading(false);
      return;
    }

    // Confirm payment
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: `${URL}/payment-success?amount=${amount}` },
    });

    if (error) {
      setError(error.message ?? "Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    // Retrieve Payment Intent to verify success
    const paymentIntentResult = await stripe.retrievePaymentIntent(clientSecret);
    const paymentIntent = paymentIntentResult.paymentIntent;

    if (paymentIntent?.status === "succeeded") {
      setError(null);
      setLoading(false);
      await saveOrderToSanity();
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      {clientSecret && <PaymentElement />}
      {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-teal-600 text-white py-2 mt-5"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutPage;
