import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, orderNumber, totalPrice } = req.body;

    await resend.emails.send({
      from: "store@example.com",
      to: email,
      subject: "Order Confirmation",
      html: `<h1>Thank You for Your Order!</h1>
             <p>Order Number: ${orderNumber}</p>
             <p>Total Price: $${totalPrice.toFixed(2)}</p>
             <p>We appreciate your business!</p>`,
    });

    return res.status(200).json({ message: "Email sent successfully!" });

  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
}
