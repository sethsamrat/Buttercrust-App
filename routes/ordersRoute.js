const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51IYnC0SIR2AbPxU0EiMx1fTwzbZXLbkaOcbc2cXx49528d9TGkQVjUINJfUDAnQMVaBFfBDP5xtcHCkZG1n1V3E800U7qXFmGf")
const Order = require('../models/orderModel');
const logger = require("../utils/logger");

router.post("/placeorder", async (req, res) => {


    logger.log({
        level: "info",
        message: "Order place request",
    });
    const { token, subtotal, currentUser, cartItems } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({
            amount: subtotal * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })

        if (payment) {

            const neworder = new Order({
                name: currentUser.name,
                email: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                orderAmount: subtotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                transactionId: payment.source.id
            })

            neworder.save()
            logger.log({
                level: "info",
                message: "Order placed successfully",
            });
            res.send('Order placed successfully')
        }
        else {
            logger.log({
                level: "warning",
                message: "Order place request failed",
            });
            res.send('Payment failed')
        }

    } catch (error) {
        logger.log({
            level: "error",
            message: "Order place request failed",
        });
        return res.status(400).json({ message: 'Something went wrong' + error });
    }

});


router.post("/getuserorders", async (req, res) => {
    logger.log({
        level: "info",
        message: "Get user orders called",
    });
    const { userid } = req.body
    try {
        const orders = await Order.find({ userid: userid }).sort({ _id: -1 })
        logger.log({
            level: "info",
            message: "Get user orders successful",
        });
        res.send(orders)
    } catch (error) {
        logger.log({
            level: "error",
            message: "Get user orders failed",
        });
        return res.status(400).json({ message: 'Something went wrong' });
    }
});

router.get("/getallorders", async (req, res) => {

    logger.log({
        level: "info",
        message: "Get all orders called",
    });

    try {
        const orders = await Order.find({})
        logger.log({
            level: "info",
            message: "Get all orders successful",
        });
        res.send(orders)
    } catch (error) {
        logger.log({
            level: "error",
            message: "Get all orders failed",
        });
        return res.status(400).json({ message: error });
    }

});

router.post("/deliverorder", async (req, res) => {
    logger.log({
        level: "info",
        message: "Deliver order called",
    });
    const orderid = req.body.orderid
    try {
        const order = await Order.findOne({ _id: orderid })
        order.isDelivered = true
        await order.save()
        logger.log({
            level: "info",
            message: "Order delivered successfully",
        });
        res.send('Order Delivered Successfully')
    } catch (error) {
        logger.log({
            level: "error",
            message: "Order delivery failed",
        });
        return res.status(400).json({ message: error });

    }

});



module.exports = router
