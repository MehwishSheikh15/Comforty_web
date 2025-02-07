import { defineType } from "sanity";

export const orderSchema = defineType({
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      description: "Unique identifier for the order",
    },
    {
      name: "customer",
      title: "Customer",
      type: "reference",
      to: [{ type: "customer" }],
      description: "Reference to the customer who placed the order",
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "products" }],
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
          ],
        },
      ],
      description: "List of products in the order",
    },
    {
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      description: "Total price for all products in the order",
    },
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      description: "Date and time when the order was placed",
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      description: "Current status of the order",
    },
    {
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        {
          name: "address",
          title: "Address",
          type: "string",
        },
        {
          name: "city",
          title: "City",
          type: "string",
        },
        {
          name: "state",
          title: "State",
          type: "string",
        },
        {
          name: "postalCode",
          title: "Postal Code",
          type: "string",
        },
        {
          name: "country",
          title: "Country",
          type: "string",
        },
      ],
      description: "Shipping address for the order",
    },
    {
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Credit Card", value: "credit_card" },
          { title: "Debit Card", value: "debit_card" },
          { title: "PayPal", value: "paypal" },
          { title: "Stripe", value: "stripe" },
          { title: "JazzCash", value: "jazzcash" },
        ],
      },
      description: "Method used to pay for the order",
    },
    {
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Failed", value: "failed" },
        ],
      },
      description: "Status of the payment for the order",
    },
  ],
});
