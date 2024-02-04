import React from "react";
import { subscriptionCard } from "../Constants/Index";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Of40zAjiej6c71ms6UJUMV7Xj8ClcCK5LGXvHwUAzN4T5y1dMx1SmQblrxBbsMi1bm1DSL2O8yx20LIq3J2asQg002Y3nyNgX"
);

const Subscription = () => {
  const handleUpgrade = async (priceId) => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });
    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {subscriptionCard.map((subscription, index) => {
        const key = Object.keys(subscription)[0];
        const { heading, price, text, features, priceId } = subscription[key];

        return (
          <div
            key={index}
            className="max-w-md bg-white border border-purple-500 rounded-lg overflow-hidden shadow-lg mx-4"
          >
            <div className="px-8 py-4">
              <div className="font-bold text-xl mb-2">{heading}</div>
              <p className="font-bold text-xl mb-2">{price}</p>
              <p className="text-gray-700 text-base">{text}</p>
              <ul className="text-gray-700 text-base list-disc pl-5 mt-2">
                {features.split(",").map((feature, index) => (
                  <li key={index}>{feature.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="px-6 py-4">
            <form action="/create-subscription-session" method="POST">
              <button
                onClick={() => handleUpgrade(priceId)}
                className="bg-purple-700 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded"
              >
                Upgrade
              </button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Subscription;
