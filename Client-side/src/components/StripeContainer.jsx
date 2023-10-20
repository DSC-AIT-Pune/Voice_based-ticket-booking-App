import React from 'react'
import {Elements} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
const PUBLIC_KEY = "pk_test_51MgiacSE7xfVzBsJBnn9e4rbxEUf8RHJ0cfhiOmbDfC8c3icMfAUamlZ5z8dIkCV1knhVCHgM3ydzWJh3nXtc2DV00zFj9JHuE"
const stripeTestPromise = loadStripe(PUBLIC_KEY);


function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm/>
        </Elements>
    )
}

export default StripeContainer