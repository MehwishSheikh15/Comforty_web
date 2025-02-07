import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// Query to fetch all customers
export const customersQuery = groq`
  *[_type == "customer"] {
    _id,
    name,
    email,
    phone,
    address,
    city,
    zipCode
  }
`;

// Query to fetch a single customer by phone number
export const customerByPhoneQuery = groq`
  *[_type == "customer" && phone == $phone][0] {
    _id,
    name,
    email,
    phone,
    address,
    city,
    zipCode
  }
`;

export async function GET(req: Request) {
  try {
    // Get phone number from query parameters
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Sanity query to fetch customer by phone
    const query = `*[_type == "customer" && phone == $phone][0]`;
    const params = { phone };

    const customer = await client.fetch(query, params);

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
