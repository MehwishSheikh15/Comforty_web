// // OrderPage.tsx
// 'use client'
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Link from 'next/link'; // Import Link from next/link

// // Define the interface for the order details
// interface Product {
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   orderNumber: string;
//   name: string;
//   address: string;
//   country: string;
//   city: string;
//   zip: string;
//   email: string;
//   phone: string;
//   paymentStatus: string;
//   shippingMethod: string;
//   orderNotes: string | null;
//   products: Product[];
//   totalPrice: number;
//   shipmentTracking: string;
// }

// const OrderPage = () => {
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

//   useEffect(() => {
//     // Get the order number from the URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const orderNumber = urlParams.get('orderNumber');

//     if (orderNumber) {
//       // Retrieve the order data from localStorage
//       const storedOrderData = localStorage.getItem(orderNumber);
//       if (storedOrderData) {
//         setOrderDetails(JSON.parse(storedOrderData));
//       }
//     }
//   }, []);

//   if (!orderDetails) {
//     return <p>Loading order details...</p>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
//         Order Details
//       </h2>

//       <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold mb-4">Order #{orderDetails.orderNumber}</h3>
//         <p><strong>Name:</strong> {orderDetails.name}</p>
//         <p><strong>Email:</strong> {orderDetails.email}</p>
//         <p><strong>Phone:</strong> {orderDetails.phone}</p>
//         <p><strong>Address:</strong> {orderDetails.address}</p>
//         <p><strong>Shipping Method:</strong> {orderDetails.shippingMethod}</p>
//         <p><strong>Payment Method:</strong> {orderDetails.paymentStatus}</p>
//         <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
//         <p><strong>Order Notes:</strong> {orderDetails.orderNotes || 'None'}</p>

//         <h4 className="text-xl font-semibold mt-6 mb-4">Products:</h4>
//         <ul>
//           {orderDetails.products.map((product, index) => (
//             <li key={index} className="mb-2">
//               <p>{product.name} - ${product.price} x {product.quantity}</p>
//             </li>
//           ))}
//         </ul>

//         {/* Use Link component from Next.js to navigate to the ShipmentPage with tracking number */}
//         <Link href={`/shipment?trackingNumber=${orderDetails.shipmentTracking}`}>
//           <button
//             className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600"
//           >
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
// 'use client'

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Product {
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   orderNumber: string;
//   name: string;
//   address: string;
//   country: string;
//   city: string;
//   zip: string;
//   email: string;
//   phone: string;
//   paymentStatus: string;
//   shippingMethod: string;
//   orderNotes: string | null;
//   products: Product[];
//   totalPrice: number;
//   shipmentTracking: string;
// }

// const OrderPage = () => {
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const orderNumber = urlParams.get('orderNumber');

//     if (orderNumber) {
//       const storedOrderData = localStorage.getItem(orderNumber);
//       if (storedOrderData) {
//         setOrderDetails(JSON.parse(storedOrderData));
//       }
//     }
//   }, []);

//   if (!orderDetails) {
//     return <p>Loading order details...</p>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
//         Order Details
//       </h2>

//       <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold mb-4">Order #{orderDetails.orderNumber}</h3>
//         <p><strong>Name:</strong> {orderDetails.name}</p>
//         <p><strong>Email:</strong> {orderDetails.email}</p>
//         <p><strong>Phone:</strong> {orderDetails.phone}</p>
//         <p><strong>Address:</strong> {orderDetails.address}</p>
//         <p><strong>Shipping Method:</strong> {orderDetails.shippingMethod}</p>
//         <p><strong>Payment Method:</strong> {orderDetails.paymentStatus}</p>
//         <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
//         <p><strong>Order Notes:</strong> {orderDetails.orderNotes || 'None'}</p>

//         <h4 className="text-xl font-semibold mt-6 mb-4">Products:</h4>
//         <ul>
//           {orderDetails.products.map((product, index) => (
//             <li key={index} className="mb-2">
//               <p>{product.name} - ${product.price} x {product.quantity}</p>
//             </li>
//           ))}
//         </ul>

//         {/* Correct Link to Shipment Page */}
//         <Link href={`/Shipment?trackingNumber=${orderDetails.shipmentTracking}`}>
//           <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600">
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Product {
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   orderNumber: string;
//   name: string;
//   address: string;
//   country: string;
//   city: string;
//   zip: string;
//   email: string;
//   phone: string;
//   paymentStatus: string;
//   shippingMethod: string;
//   orderNotes: string | null;
//   products: Product[];
//   totalPrice: number;
//   shipmentTracking: string;
// }

// const OrderPage = () => {
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const orderNumber = urlParams.get('orderNumber');

//     if (orderNumber) {
//       const storedOrderData = localStorage.getItem(orderNumber);
//       if (storedOrderData) {
//         setOrderDetails(JSON.parse(storedOrderData));
//       }
//     }
//   }, []);

//   if (!orderDetails) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto text-center">
//         <h2 className="text-3xl font-bold text-indigo-900 mb-4">Order Details</h2>
//         <p className="text-lg text-gray-700">No details available.</p>
//         <Link href="/Shipment">
//           <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600">
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
//         Order Details
//       </h2>

//       <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold mb-4">Order #{orderDetails.orderNumber}</h3>
//         <p><strong>Name:</strong> {orderDetails.name}</p>
//         <p><strong>Email:</strong> {orderDetails.email}</p>
//         <p><strong>Phone:</strong> {orderDetails.phone}</p>
//         <p><strong>Address:</strong> {orderDetails.address}</p>
//         <p><strong>Shipping Method:</strong> {orderDetails.shippingMethod}</p>
//         <p><strong>Payment Method:</strong> {orderDetails.paymentStatus}</p>
//         <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
//         <p><strong>Order Notes:</strong> {orderDetails.orderNotes || 'None'}</p>

//         <h4 className="text-xl font-semibold mt-6 mb-4">Products:</h4>
//         <ul>
//           {orderDetails.products.map((product, index) => (
//             <li key={index} className="mb-2">
//               <p>{product.name} - ${product.price} x {product.quantity}</p>
//             </li>
//           ))}
//         </ul>

//         {/* Correct Link to Shipment Page */}
//         <Link href={`/Shipment?trackingNumber=${orderDetails.shipmentTracking}`}>
//           <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600">
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// interface Product {
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   orderNumber: string;
//   name: string;
//   address: string;
//   country: string;
//   city: string;
//   zip: string;
//   email: string;
//   phone: string;
//   paymentStatus: string;
//   shippingMethod: string;
//   orderNotes: string | null;
//   products: Product[];
//   totalPrice: number;
//   shipmentTracking: string;
// }

// const OrderPage = () => {
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const orderNumber = urlParams.get("orderNumber");

//     if (orderNumber) {
//       const storedOrderData = localStorage.getItem(orderNumber);
//       if (storedOrderData) {
//         setOrderDetails(JSON.parse(storedOrderData));
//       }
//     }
//   }, []);

//   if (!orderDetails) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto text-center">
//         <h2 className="text-3xl font-bold text-indigo-900 mb-4">Order Details</h2>
//         <p className="text-lg text-gray-700">No details available.</p>
//         <Link href="/Shipment">
//           <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600">
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">Order Details</h2>

//       <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold mb-4">Order #{orderDetails.orderNumber}</h3>
//         <p><strong>Name:</strong> {orderDetails.name}</p>
//         <p><strong>Email:</strong> {orderDetails.email}</p>
//         <p><strong>Phone:</strong> {orderDetails.phone}</p>
//         <p><strong>Address:</strong> {orderDetails.address}</p>
//         <p><strong>Shipping Method:</strong> {orderDetails.shippingMethod}</p>
//         <p><strong>Payment Method:</strong> {orderDetails.paymentStatus}</p>
//         <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
//         <p><strong>Order Notes:</strong> {orderDetails.orderNotes || 'None'}</p>

//         <h4 className="text-xl font-semibold mt-6 mb-4">Products:</h4>
//         <ul>
//           {orderDetails.products.map((product, index) => (
//             <li key={index} className="mb-2">
//               <p>{product.name} - ${product.price} x {product.quantity}</p>
//             </li>
//           ))}
//         </ul>

//         <Link href={`/Shipment?trackingNumber=${orderDetails.shipmentTracking}`}>
//           <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600">
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  orderNumber: string;
  name: string;
  address: string;
  country: string;
  city: string;
  zip: string;
  email: string;
  phone: string;
  paymentStatus: string;
  shippingMethod: string;
  orderNotes: string | null;
  products: Product[];
  totalPrice: number;
  shipmentTracking: string;
}

const OrderPage = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get("orderNumber");

    if (orderNumber) {
      const storedOrderData = localStorage.getItem(orderNumber);
      if (storedOrderData) {
        setOrderDetails(JSON.parse(storedOrderData));
      }
    }
  }, []);

  if (!orderDetails) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">Order Details</h2>
        <p className="text-lg text-gray-700">No details available.</p>
        <Link href="/Shipment">
          <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600">
            Go to Shipment Tracking
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">Order Details</h2>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Order #{orderDetails.orderNumber}</h3>
        <p><strong>Name:</strong> {orderDetails.name}</p>
        <p><strong>Email:</strong> {orderDetails.email}</p>
        <p><strong>Phone:</strong> {orderDetails.phone}</p>
        <p><strong>Address:</strong> {orderDetails.address}</p>
        <p><strong>Shipping Method:</strong> {orderDetails.shippingMethod}</p>
        <p><strong>Payment Method:</strong> {orderDetails.paymentStatus}</p>
        <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
        <p><strong>Order Notes:</strong> {orderDetails.orderNotes || 'None'}</p>

        <h4 className="text-xl font-semibold mt-6 mb-4">Products:</h4>
        <ul>
          {orderDetails.products.map((product, index) => (
            <li key={index} className="mb-2">
              <p>{product.name} - ${product.price} x {product.quantity}</p>
            </li>
          ))}
        </ul>

        <Link href={`/Shipment?trackingNumber=${orderDetails.shipmentTracking}`}>
          <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600">
            Go to Shipment Tracking
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderPage;
// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useReactToPrint } from "react-to-print";
// import { CheckCircleIcon, DownloadIcon } from "lucide-react";

// interface Order {
//   _id: string;
//   customer: {
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//   };
//   products: {
//     _id: string;
//     title: string;
//     price: number;
//     quantity: number;
//   }[];
//   totalPrice: number;
//   paymentMethod: string;
//   status: string;
// }

// const OrderPage = () => {
//   const [order, setOrder] = useState<Order | null>(null);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const orderId = searchParams.get("orderId");
//   const componentRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!orderId) return;

//     const fetchOrder = async () => {
//       try {
//         const response = await fetch(`/api/orders/${orderId}`);
//         if (!response.ok) throw new Error("Failed to fetch order");
//         const data: Order = await response.json();
//         setOrder(data);
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   // ✅ Fix TypeScript error for `useReactToPrint`
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current as HTMLDivElement, // Ensure correct type
//     documentTitle: `Order-${orderId}`,
//   });

//   if (!order) {
//     return <p className="text-center mt-10">Loading order details...</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md mt-10">
//       {/* Success Notification */}
//       <div className="flex items-center bg-green-100 text-green-700 p-4 rounded-md mb-4">
//         <CheckCircleIcon className="h-6 w-6 mr-2" />
//         <p>Thank you! Your order has been placed successfully.</p>
//       </div>

//       {/* Order Receipt */}
//       <div ref={componentRef} className="p-6 border rounded-lg">
//         <h2 className="text-xl font-bold mb-2">Order Receipt</h2>
//         <p className="text-gray-600 mb-4">Order ID: <strong>{order._id}</strong></p>

//         <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
//         <p><strong>Name:</strong> {order.customer.name}</p>
//         <p><strong>Email:</strong> {order.customer.email}</p>
//         <p><strong>Phone:</strong> {order.customer.phone}</p>
//         <p><strong>Address:</strong> {order.customer.address}</p>

//         <h3 className="text-lg font-semibold mt-4 mb-2">Order Details</h3>
//         <ul className="border-t pt-2">
//           {order.products.map((product) => (
//             <li key={product._id} className="flex justify-between p-2 border-b">
//               <span>{product.title} x {product.quantity}</span>
//               <span>${product.price * product.quantity}</span>
//             </li>
//           ))}
//         </ul>

//         <div className="flex justify-between font-bold text-lg mt-3">
//           <span>Total:</span>
//           <span>${order.totalPrice}</span>
//         </div>

//         <p className="text-gray-600 mt-2">Payment Method: {order.paymentMethod}</p>
//         <p className="text-gray-600">Status: <span className="text-teal-600">{order.status}</span></p>
//       </div>

//       {/* ✅ Fix onClick issue */}
//       <button
//         onClick={() => handlePrint()} // Ensure function call is wrapped in an arrow function
//         className="mt-5 flex items-center justify-center w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
//       >
//         <DownloadIcon className="h-5 w-5 mr-2" />
//         Download Receipt (PDF)
//       </button>
//     </div>
//   );
// };

// export default OrderPage;
