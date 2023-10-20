const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require("fs");
const path = require("path");

router.post('/', async (req, res) => {
    console.log(req.body);
    const { EmailAddress, Location } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            service: "gmail",
            secure: false,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_SECRET_KEY
            }
        })
        const mailOptions = {
            from: process.env.GMAIL,
            to: EmailAddress,
            subject: `Hotel recomendations for your happy journey in ${Location}`,
            html: "<h1>Check out this cool hotels in your location </h1><br/><img src='cid:unique-image-id'><br/><img src='cid:unique-image-id1'><br/><p>And visit my website:</p><a href='https://innerve7-client.vercel.app/'>Udchalein</a>",
            attachments: [
                {
                    filename: "hotel.jpg",
                    path: "https://media-cdn.tripadvisor.com/media/photo-o/09/b6/1c/4d/cosy-beach-hotel.jpg",
                    cid: "unique-image-id",
                },
                {
                    filename: "hotel1.jpg",
                    path: "https://media-cdn.tripadvisor.com/media/photo-o/07/cb/a0/7b/pinnacle-grand-jomtien.jpg",
                    cid: "unique-image-id1",
                },
            ],
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error", error)
            } else {
                console.log("Email sent" + info.response);
                res.status(201).json({ status: 201, info })
            }
        })
    } catch (error) {
        res.status(201).json({ status: 401, error })
    }
})
router.post('/payment', async (req, res) => {
    console.log(req.body);
    const { EmailAddress, Price } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            service: "gmail",
            secure: false,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_SECRET_KEY
            }
        })
        const mailOptions = {
            from: process.env.GMAIL,
            to: EmailAddress,
            subject: "Payment request via Stripe",
            html: `<p>Here is your Stripe payment link:<p/><a href='https://buy.stripe.com/test_28o2as8IGeFK2Fa288'>Stripe Payment link</a><br/> Your total bill is ${Price}`,
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error", error)
            } else {
                console.log("Email sent" + info.response);
                res.status(201).json({ status: 201, info })
            }
        })
    } catch (error) {
        res.status(201).json({ status: 401, error })
    }
})
router.get('/', async (req, res) => {
    try {
        res.json({
            "success": true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router