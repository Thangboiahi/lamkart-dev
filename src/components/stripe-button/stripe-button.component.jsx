import React from "react";
import StripeCheckout from "react-stripe-checkout";

import "./stripe-button.styles.scss";

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price*100;
  const publishableKey = "pk_test_51GwuMDLHuNtDFggCMEKWipDBmU62bchCpZoCdxxJoXVpRKN0US8jJ25Es4Z7u63df1BlkQnKiFnyPOL4FFEta4hk00WeTadRC1";

  const onToken = token => {
    console.log(token);
    alert('Payment successful!');
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name="Lamkart"
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
};

export default StripeCheckoutButton;