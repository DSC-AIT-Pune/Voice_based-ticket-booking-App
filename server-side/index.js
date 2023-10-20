const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

// Router for payment
const paymentRouter = require('./routes/Payment')
app.use("/payment", paymentRouter);

// Router for registering user
const registerRouter = require('./routes/Register')
app.use("/register", registerRouter);

app.listen(process.env.PORT || 3001, () => {
    console.log("server running on port 3001");
});

