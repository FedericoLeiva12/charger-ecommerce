import React from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Button } from "@material-ui/core";

export default function CardForm  ()  {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    if (!stripe || !elements) {
      
      return;
    }

   
    const cardElement = elements.getElement(CardElement);


    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button variant="contained" type="submit" color="secondary" disabled={!stripe}>
          Purchase
      </Button>
    </form>
  );
};