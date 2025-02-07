
// 'use client';
// // Import environment variables from .env.local
// import "dotenv/config";

// // Import the Sanity client to interact with the Sanity backend
// import { createClient } from "@sanity/client";

// // Load required environment variables
// const {
//   NEXT_PUBLIC_SANITY_PROJECT_ID, // Sanity project ID
//   NEXT_PUBLIC_SANITY_DATASET, // Sanity dataset (e.g., "production")
//   NEXT_PUBLIC_SANITY_AUTH_TOKEN, // Sanity API token
//   BASE_URL = "https://giaic-hackathon-template-08.vercel.app", // API base URL for products and categories
// } = process.env;

// // Check if the required environment variables are provided
// if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_AUTH_TOKEN) {
//   console.error("Missing required environment variables. Please check your .env.local file.");
//   process.exit(1); // Stop execution if variables are missing
// }

// // Create a Sanity client instance to interact with the target Sanity dataset
// const targetClient = createClient({
//   projectId: NEXT_PUBLIC_SANITY_PROJECT_ID, // Your Sanity project ID
//   dataset: NEXT_PUBLIC_SANITY_DATASET || "production", // Default to "production" if not set
//   useCdn: false, // Disable CDN for real-time updates
//   apiVersion: "2023-01-01", // Sanity API version
//   token: NEXT_PUBLIC_SANITY_AUTH_TOKEN, // API token for authentication
// });

// // Function to upload an image to Sanity
// async function uploadImageToSanity(imageUrl) {
//   try {
//     // Fetch the image from the provided URL
//     const response = await fetch(imageUrl);
//     if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`);

//     // Convert the image to a buffer (binary format)
//     const buffer = await response.arrayBuffer();

//     // Upload the image to Sanity and get its asset ID
//     const uploadedAsset = await targetClient.assets.upload("image", Buffer.from(buffer), {
//       filename: imageUrl.split("/").pop(), // Use the file name from the URL
//     });

//     return uploadedAsset._id; // Return the asset ID
//   } catch (error) {
//     console.error("Error uploading image:", error.message);
//     return null; // Return null if the upload fails
//   }
// }

// // Main function to migrate data from REST API to Sanity
// async function migrateData() {
//   console.log("Starting data migration...");

//   try {
//     // Fetch categories from the REST API
//     const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
//     if (!categoriesResponse.ok) throw new Error("Failed to fetch categories.");
//     const categoriesData = await categoriesResponse.json(); // Parse response to JSON

//     // Fetch products from the REST API
//     const productsResponse = await fetch(`${BASE_URL}/api/products`);
//     if (!productsResponse.ok) throw new Error("Failed to fetch products.");
//     const productsData = await productsResponse.json(); // Parse response to JSON

//     const categoryIdMap = {}; // Map to store migrated category IDs

//     // Migrate categories
//     for (const category of categoriesData) {
//       console.log(`Migrating category: ${category.title}`);
//       const imageId = await uploadImageToSanity(category.imageUrl); // Upload category image

//       // Prepare the new category object
//       const newCategory = {
//         _id: category._id, // Use the same ID for reference mapping
//         _type: "categories",
//         title: category.title,
//         image: imageId ? { _type: "image", asset: { _ref: imageId } } : undefined, // Add image if uploaded
//       };

//       // Save the category to Sanity
//       const result = await targetClient.createOrReplace(newCategory);
//       categoryIdMap[category._id] = result._id; // Store the new category ID
//       console.log(`Migrated category: ${category.title} (ID: ${result._id})`);
//     }

//     // Migrate products
//     for (const product of productsData) {
//       console.log(`Migrating product: ${product.title}`);
//       const imageId = await uploadImageToSanity(product.imageUrl); // Upload product image

//       // Prepare the new product object
//       const newProduct = {
//         _type: "products",
//         title: product.title,
//         price: product.price,
//         priceWithoutDiscount: product.priceWithoutDiscount,
//         badge: product.badge,
//         image: imageId ? { _type: "image", asset: { _ref: imageId } } : undefined, // Add image if uploaded
//         category: {
//           _type: "reference",
//           _ref: categoryIdMap[product.category._id], // Use the migrated category ID
//         },
//         description: product.description,
//         inventory: product.inventory,
//         tags: product.tags,
//       };

//       // Save the product to Sanity
//       const result = await targetClient.create(newProduct);
//       console.log(`Migrated product: ${product.title} (ID: ${result._id})`);
//     }

//     console.log("Data migration completed successfully!");
//   } catch (error) {
//     console.error("Error during migration:", error.message);
//     process.exit(1); // Stop execution if an error occurs
//   }
// }

// // Start the migration process
// migrateData();
// 'use client';
// // Import environment variables from .env.local
// import "dotenv/config";

// // Import the Sanity client to interact with the Sanity backend
// import { createClient } from "@sanity/client";

// // Load required environment variables
// const {
//   NEXT_PUBLIC_SANITY_PROJECT_ID, // Sanity project ID
//   NEXT_PUBLIC_SANITY_DATASET, // Sanity dataset (e.g., "production")
//   NEXT_PUBLIC_SANITY_AUTH_TOKEN, // Sanity API token
//   BASE_URL = "https://giaic-hackathon-template-08.vercel.app", // API base URL for products and categories
// } = process.env;

// // Check if the required environment variables are provided
// if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_AUTH_TOKEN) {
//   console.error("Missing required environment variables. Please check your .env.local file.");
//   process.exit(1); // Stop execution if variables are missing
// }

// // Create a Sanity client instance to interact with the target Sanity dataset
// const targetClient = createClient({
//   projectId: NEXT_PUBLIC_SANITY_PROJECT_ID, // Your Sanity project ID
//   dataset: NEXT_PUBLIC_SANITY_DATASET || "production", // Default to "production" if not set
//   useCdn: false, // Disable CDN for real-time updates
//   apiVersion: "2023-01-01", // Sanity API version
//   token: NEXT_PUBLIC_SANITY_AUTH_TOKEN, // API token for authentication
// });

// // Function to upload an image to Sanity
// async function uploadImageToSanity(imageUrl) {
//   try {
//     // Fetch the image from the provided URL
//     const response = await fetch(imageUrl);
//     if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`);

//     // Convert the image to a buffer (binary format)
//     const buffer = await response.arrayBuffer();

//     // Upload the image to Sanity and get its asset ID
//     const uploadedAsset = await targetClient.assets.upload("image", Buffer.from(buffer), {
//       filename: imageUrl.split("/").pop(), // Use the file name from the URL
//     });

//     return uploadedAsset._id; // Return the asset ID
//   } catch (error) {
//     console.error("Error uploading image:", error.message);
//     return null; // Return null if the upload fails
//   }
// }

// // Main function to migrate data from REST API to Sanity
// async function migrateData() {
//   console.log("Starting data migration...");

//   try {
//     // Fetch categories from the REST API
//     const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
//     if (!categoriesResponse.ok) throw new Error("Failed to fetch categories.");
//     const categoriesData = await categoriesResponse.json(); // Parse response to JSON

//     // Fetch products from the REST API
//     const productsResponse = await fetch(`${BASE_URL}/api/products`);
//     if (!productsResponse.ok) throw new Error("Failed to fetch products.");
//     const productsData = await productsResponse.json(); // Parse response to JSON

//     // Fetch orders from the REST API
//     const ordersResponse = await fetch(`${BASE_URL}/api/orders`);
//     if (!ordersResponse.ok) throw new Error("Failed to fetch orders.");
//     const ordersData = await ordersResponse.json(); // Parse response to JSON

//     const categoryIdMap = {}; // Map to store migrated category IDs
//     const productIdMap = {}; // Map to store migrated product IDs

//     // Migrate categories
//     for (const category of categoriesData) {
//       console.log(`Migrating category: ${category.title}`);
//       const imageId = await uploadImageToSanity(category.imageUrl); // Upload category image

//       // Prepare the new category object
//       const newCategory = {
//         _id: category._id, // Use the same ID for reference mapping
//         _type: "categories",
//         title: category.title,
//         image: imageId ? { _type: "image", asset: { _ref: imageId } } : undefined, // Add image if uploaded
//       };

//       // Save the category to Sanity
//       const result = await targetClient.createOrReplace(newCategory);
//       categoryIdMap[category._id] = result._id; // Store the new category ID
//       console.log(`Migrated category: ${category.title} (ID: ${result._id})`);
//     }

//     // Migrate products
//     for (const product of productsData) {
//       console.log(`Migrating product: ${product.title}`);
//       const imageId = await uploadImageToSanity(product.imageUrl); // Upload product image

//       // Prepare the new product object
//       const newProduct = {
//         _type: "products",
//         title: product.title,
//         price: product.price,
//         priceWithoutDiscount: product.priceWithoutDiscount,
//         badge: product.badge,
//         image: imageId ? { _type: "image", asset: { _ref: imageId } } : undefined, // Add image if uploaded
//         category: {
//           _type: "reference",
//           _ref: categoryIdMap[product.category._id], // Use the migrated category ID
//         },
//         description: product.description,
//         inventory: product.inventory,
//         tags: product.tags,
//       };

//       // Save the product to Sanity
//       const result = await targetClient.create(newProduct);
//       productIdMap[product._id] = result._id; // Store the migrated product ID
//       console.log(`Migrated product: ${product.title} (ID: ${result._id})`);
//     }

//     // Migrate orders
//     for (const order of ordersData) {
//       console.log(`Migrating order for user: ${order.userId}`);
//       const productReferences = order.products.map((prod) => ({
//         _type: "reference",
//         _ref: productIdMap[prod.productId], // Use the migrated product ID
//       }));

//       // Prepare the new order object
//       const newOrder = {
//         _type: "orders",
//         userId: order.userId,
//         products: productReferences,
//         totalPrice: order.totalPrice,
//         orderDate: order.orderDate,
//         status: order.status,
//         paymentStatus: order.paymentStatus,
//         shippingAddress: order.shippingAddress,
//         billingAddress: order.billingAddress,
//       };

//       // Save the order to Sanity
//       const result = await targetClient.create(newOrder);
//       console.log(`Migrated order for user: ${order.userId} (ID: ${result._id})`);
//     }

//     console.log("Data migration completed successfully!");
//   } catch (error) {
//     console.error("Error during migration:", error.message);
//     process.exit(1); // Stop execution if an error occurs
//   }
// }

// // Start the migration process
// migrateData();
'use client';
// Import environment variables from .env.local
import "dotenv/config";

// Import the Sanity client to interact with the Sanity backend
import { createClient } from "@sanity/client";

// Load required environment variables
const {
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_AUTH_TOKEN,
  BASE_URL = "https://giaic-hackathon-template-08.vercel.app",
} = process.env;

// Check if the required environment variables are provided
if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_AUTH_TOKEN) {
  console.error("Missing required environment variables. Please check your .env.local file.");
  process.exit(1);
}

// Create a Sanity client instance
const targetClient = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-02-07",
  token: NEXT_PUBLIC_SANITY_AUTH_TOKEN,
});

// Function to upload an image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`);

    const buffer = await response.arrayBuffer();

    const uploadedAsset = await targetClient.assets.upload("image", Buffer.from(buffer), {
      filename: imageUrl.split("/").pop(),
    });

    return uploadedAsset._id;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
}

// Main function to migrate data
async function migrateData() {
  console.log("Starting data migration...");

  try {
    // Fetch data from the REST API
    const [categoriesData, productsData, customersData, ordersData] = await Promise.all([
      fetch(`${BASE_URL}/api/categories`).then(res => res.json()),
      fetch(`${BASE_URL}/api/products`).then(res => res.json()),
      fetch(`${BASE_URL}/api/customers`).then(res => res.json()),
      fetch(`${BASE_URL}/api/orders`).then(res => res.json()),
    ]);

    const categoryIdMap = {}; // To store category mappings
    const customerIdMap = {}; // To store customer mappings

    // Migrate categories
    for (const category of categoriesData) {
      console.log(`Migrating category: ${category.title}`);
      const imageId = await uploadImageToSanity(category.imageUrl);

      const newCategory = {
        _id: category._id,
        _type: "categories",
        title: category.title,
        image: imageId ? { _type: "image", asset: { _ref: imageId } } : undefined,
      };

      const result = await targetClient.createOrReplace(newCategory);
      categoryIdMap[category._id] = result._id;
      console.log(`Migrated category: ${category.title} (ID: ${result._id})`);
    }

    // Migrate customers
    for (const customer of customersData) {
      console.log(`Migrating customer: ${customer.name}`);

      const newCustomer = {
        _id: customer._id,
        _type: "customers",
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        zipCode: customer.zipCode,
      };

      const result = await targetClient.createOrReplace(newCustomer);
      customerIdMap[customer._id] = result._id;
      console.log(`Migrated customer: ${customer.name} (ID: ${result._id})`);
    }

    // Migrate products
    for (const product of productsData) {
      console.log(`Migrating product: ${product.title}`);
      const imageId = await uploadImageToSanity(product.imageUrl);

      const newProduct = {
        _type: "products",
        title: product.title,
        price: product.price,
        priceWithoutDiscount: product.priceWithoutDiscount,
        badge: product.badge,
        image: imageId ? { _type: "image", asset: { _ref: imageId } } : undefined,
        category: {
          _type: "reference",
          _ref: categoryIdMap[product.category._id],
        },
        description: product.description,
        inventory: product.inventory,
        tags: product.tags,
      };

      const result = await targetClient.create(newProduct);
      console.log(`Migrated product: ${product.title} (ID: ${result._id})`);
    }

    // Migrate orders
    for (const order of ordersData) {
      console.log(`Migrating order: ${order.orderNumber}`);

      const newOrder = {
        _id: order._id,
        _type: "orders",
        orderNumber: order.orderNumber,
        customer: {
          _type: "reference",
          _ref: customerIdMap[order.customer._id],
        },
        products: order.products.map(product => ({
          _type: "product",
          _ref: product._id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalPrice: order.totalPrice,
        status: order.status,
        paymentStatus: order.paymentStatus,
        shipmentTracking: order.shipmentTracking,
        shippingMethod: order.shippingMethod,
      };

      const result = await targetClient.create(newOrder);
      console.log(`Migrated order: ${order.orderNumber} (ID: ${result._id})`);
    }

    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error.message);
    process.exit(1);
  }
}

// Start the migration process
migrateData();
