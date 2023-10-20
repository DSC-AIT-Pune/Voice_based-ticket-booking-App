const express = require('express');
const router = express.Router();
//payment key
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

router.post("/", async (req, res) => {
    let { amount, id } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Udchalein",
            payment_method: id,
            confirm: true
        })
        console.log("paymet", payment)
        res.json({
            message: "Payment Successful",
            success: true
        })
    } catch (error) {
        console.error("Error", error)
        res.json({
            message: "Payment Failed",
            success: false
        })
    }
})

router.get("/", async (req, res) => {
    try {
        res.json({
            "payment_status": "success",
            "payment_id": 192301,
            "success": true,
            "company": "Udchalein",
            "currency": "INR",
            "amount": 1000,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router