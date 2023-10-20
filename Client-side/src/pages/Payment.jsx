import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import StripeContainer from '../components/StripeContainer';
import '../styles/pages/payment.css'

function Payment() {
    let { id, price } = useParams();
    const [showItem, setShowItem] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let payload = {}
        for (let i = 0; i < event.target.length - 1; i++) {
            payload[event.target[i].id] = (event.target[i].value)
        }
        console.log(payload);
        axios.post("https://innerve7-server.vercel.app/register/payment", JSON.parse(JSON.stringify(payload))).then((Response) => {
            console.log("Payment link sended via mail")
        });
        alert("Sent payment link");
    }
    return (
        <div style={{
            background: 'transparent',
            'font-family': 'Quicksand',
            display: 'flex',
            'flex-direction': 'column',
            
        }}>
            <h1>Book your hotel with Udchalein</h1>
            {showItem ? (<StripeContainer />) : (
                <div className='payment-page'>
                    <div className='paymentApp'>
                        <h3>Bill Range: {price}<br />For the hotel id {id}</h3>
                        <button onClick={() => setShowItem(true)}>Book Hotel</button>
                    </div>
                    <div className='paymentviastripe'>
                        <h3>Noooo I dont trust your payment gateway, I'll prefer Stripe</h3>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="emailAddress" style={{
                                        "font-size": "14px",
                                        "font-weight": "bold",
                                        "margin-bottom": "5px",
                                        "paddingRight": "13px",
                                        "paddingLeft": "20px",
                                        "paddingTop": "20px"
                                    }}>Email Address:</label>
                                    <input type="email" id="EmailAddress" placeholder="(Ex. ajaysingh1234@gmail....)" value={email} onChange={(event) => setEmail(event.target.value)}
                                        style={{
                                            "padding": "5px",
                                            "border": "1px solid #ccc",
                                            "border-radius": "3px",
                                            "width": "200px",
                                            "font-size": "14px",
                                            marginRight: "10px"
                                        }} />
                                </div>
                                <div>
                                    <label htmlFor="int" style={{
                                        "font-size": "14px",
                                        "font-weight": "bold",
                                        "margin-bottom": "5px",
                                        "paddingRight": "13px",
                                        "paddingLeft": "20px",
                                        "paddingTop": "20px"
                                    }}>Your Total Bill:</label>
                                    <input type="string" id="Price" placeholder="(Ex. Your Total Bill....)" value={price} style={{
                                        "padding": "5px",
                                        "border": "1px solid #ccc",
                                        "border-radius": "3px",
                                        "width": "200px",
                                        "font-size": "14px",
                                        marginRight: "10px"
                                    }} />
                                </div>
                                <button type="submit" style={{
                                    marginBottom: "20px"
                                }}>Send payment link</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Payment