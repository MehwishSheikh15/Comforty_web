import { groq } from "next-sanity";

// Query to fetch all categories
export const categoriesQuery = groq`
  *[_type == "categories"] {
    _id,
    title,
    "imageUrl": image.asset->url,
    products
  }
`;

// Query to fetch all products
export const productsQuery = groq`
  *[_type == "products"] {
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "imageUrl": image.asset->url,
    category->{title},
    description,
    inventory,
    tags
  }
`;

// Query to fetch a single product by its ID
export const productByIdQuery = groq`
  *[_type == "products" && _id == $id][0] {
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "imageUrl": image.asset->url,
    category->{title},
    description,
    inventory,
    tags
  }
`;

// Query to fetch products by category
export const productsByCategoryQuery = groq`
  *[_type == "products" && category._ref == $categoryId] {
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "imageUrl": image.asset->url,
    description,
    inventory,
    tags
  }
`;

// Query to fetch featured products (based on a tag)
export const featuredProductsQuery = groq`
  *[_type == "products" && "featured" in tags] {
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "imageUrl": image.asset->url,
    category->{title},
    description,
    inventory,
    tags
  }
`;
export const ordersQuery = groq`
  *[_type == "orders"] {
    _id,
    orderNumber,
    customer-> {
      _id,
      name,
      email
    },
    products[] {
      product-> {
        _id,
        title,
        price,
        image {
          asset -> {
            _id,
            url
          }
        }
      },
      quantity,
      price
    },
    totalPrice,
    orderDate,
    status,
    shippingAddress {
      address,
      city,
      state,
      postalCode,
      country
    },
    paymentMethod,
    paymentStatus
  }
`;
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
export const customerByIdQuery = groq`
  *[_type == "customer" && _id == $id][0] {
    _id,
    name,
    email,
    phone,
    address,
    city,
    zipCode
  }
`;
