// import { NextResponse } from "next/server";
// import { groq } from "next-sanity";
// import { client } from "@/sanity/lib/client";
// // Query to fetch all orders
// const ordersQuery = groq`
//   *[_type == "orders"] {
//     _id,
//     orderNumber,
//     customer-> {
//       _id,
//       name,
//       email
//     },
//     products[] {
//       product-> {
//         _id,
//         title,
//         price,
//         image {
//           asset -> {
//             _id,
//             url
//           }
//         }
//       },
//       quantity,
//       price
//     },
//     totalPrice,
//     orderDate,
//     status,
//     shippingAddress {
//       address,
//       city,
//       state,
//       postalCode,
//       country
//     },
//     paymentMethod,
//     paymentStatus
//   }
// `;

// // Query to fetch a single order by ID
// const orderByIdQuery = groq`
//   *[_type == "orders" && _id == $id][0] {
//     _id,
//     orderNumber,
//     customer-> {
//       _id,
//       name,
//       email
//     },
//     products[] {
//       product-> {
//         _id,
//         title,
//         price,
//         image {
//           asset -> {
//             _id,
//             url
//           }
//         }
//       },
//       quantity,
//       price
//     },
//     totalPrice,
//     orderDate,
//     status,
//     shippingAddress {
//       address,
//       city,
//       state,
//       postalCode,
//       country
//     },
//     paymentMethod,
//     paymentStatus
//   }
// `;

// Handle GET request to fetch all orders
// export async function GET() {
//   try {
//     const orders = await client.fetch(ordersQuery);
//     return NextResponse.json(orders);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
//   }
// }

// // Handle GET request to fetch a specific order by ID
// export async function PUSH({ params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const order = await client.fetch(orderByIdQuery, { id });
//     if (!order) {
//       return NextResponse.json({ error: "Order not found" }, { status: 404 });
//     }
//     return NextResponse.json(order);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
//   }
// }

// // Handle POST request to create a new order
// export async function POST(request: Request) {
//   try {
//     const orderData = await request.json();

//     const newOrder = {
//       _type: "orders",
//       orderNumber: orderData.orderNumber,
//       customer: {
//         _type: "reference",
//         _ref: orderData.customerId,
//       },
//       products: orderData.products,
//       totalPrice: orderData.totalPrice,
//       orderDate: new Date().toISOString(),
//       status: orderData.status,
//       shippingAddress: orderData.shippingAddress,
//       paymentMethod: orderData.paymentMethod,
//       paymentStatus: orderData.paymentStatus,
//     };

//     const createdOrder = await client.create(newOrder);
//     return NextResponse.json(createdOrder, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//   }
// }

// // Handle PUT request to update an existing order by ID
// export async function PUT({ params, request }: { params: { id: string }, request: Request }) {
//   const { id } = params;
//   const updatedData = await request.json();

//   try {
//     const updatedOrder = await client
//       .patch(id)
//       .set(updatedData)
//       .commit();

//     return NextResponse.json(updatedOrder);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    console.log("📥 Received Order Data:", orderData); // Debugging

    if (!orderData.customer || !orderData.products || orderData.products.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const { customer } = orderData;

    // Check if customer exists in Sanity
    const customerQuery = `*[_type == "customer" && phone == $phone][0]`;
    const existingCustomer = await client.fetch(customerQuery, { phone: customer.phone });

    let customerId = existingCustomer?._id;

    // Create new customer if not exists
    if (!existingCustomer) {
      console.log("👤 Creating new customer...");

      const newCustomer = await client.create({
        _type: "customer",
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        zipCode: customer.zipCode,
      });

      customerId = newCustomer._id;
      console.log("✅ New customer created:", customerId);
    } else {
      console.log("✔ Existing customer found:", customerId);
    }

    // Create order in Sanity
    console.log("🛒 Saving order...");

    const newOrder = await client.create({
      _type: "orders",
      customer: { _type: "reference", _ref: customerId },
      products: orderData.products.map((product: any) => ({
        _key: product._id,
        product: { _type: "reference", _ref: product._id },
        quantity: product.quantity,
        price: product.price,
      })),
      totalPrice: orderData.totalPrice,
      paymentMethod: orderData.paymentMethod || "Stripe",
      paymentStatus: orderData.paymentStatus || "Paid",
      orderDate: new Date().toISOString(),
      status: "Processing", // Ensure consistency with frontend
      shippingAddress: {
        _type: "shippingAddress",
        address: customer.address,
        city: customer.city,
        postalCode: customer.zipCode,
        country: "USA", // You can update this dynamically
      },
    });

    console.log("✅ Order saved successfully:", newOrder);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
