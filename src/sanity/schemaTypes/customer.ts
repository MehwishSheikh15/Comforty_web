import { defineType } from "sanity";

export const customerSchema = defineType({
  name: "customer",
  title: "Customers",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "zipCode",
      title: "Zip Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
});
