// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51Of40zAjiej6c71moqLHVFMehFARTAdpnQbG2YH1ExLOohYokxbegG8o8Ly1cxMYy5oT2g2OK4AAHv215k0q7gka00jCHtE7Z2"
);
const express = require("express");
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:3000/";

app.post('/create-subscription-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: "subscription",
    lineItems: [
      { price: "prod_PV7LUU9sXRljz6", quantity: 1 },
      { price: "prod_PUs9EKjiI2hwiA", quantity: 1 },
    ],
   
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ id: session.id });
});