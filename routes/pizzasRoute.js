const express = require("express");
const router = express.Router();
const Pizza = require('../models/pizzaModel');
const logger = require("../utils/logger");

router.get("/getallpizzas", async (req, res) => {
    logger.log({
        level: "info",
        message: "Get all pizzas called",
    });
    try {
        const pizzas = await Pizza.find({})
        logger.log({
            level: "info",
            message: "Get all pizzas successful",
        });
        res.send(pizzas)
    } catch (error) {
        logger.log({
            level: "error",
            message: "Get all pizzas failed",
        });
        return res.status(400).json({ message: error });
    }

});

router.post("/addpizza", async (req, res) => {

    logger.log({
        level: "info",
        message: "Add pizza called",
    });

    const pizza = req.body.pizza

    try {
        const newpizza = new Pizza({
            name: pizza.name,
            image: pizza.image,
            varients: ['small', 'medium', 'large'],
            description: pizza.description,
            category: pizza.category,
            prices: [pizza.prices]
        })
        await newpizza.save()
        logger.log({
            level: "info",
            message: "Pizza added successfully",
        });
        res.send('New Pizza Added Successfully')
    } catch (error) {
        logger.log({
            level: "error",
            message: "Add pizza failed",
        });
        return res.status(400).json({ message: error });
    }

});

router.post("/getpizzabyid", async (req, res) => {
    logger.log({
        level: "info",
        message: "get pizza by id called",
    });
    const pizzaid = req.body.pizzaid

    try {
        const pizza = await Pizza.findOne({ _id: pizzaid })
        logger.log({
            level: "info",
            message: "Get pizza by id successful",
        });
        res.send(pizza)
    } catch (error) {
        logger.log({
            level: "error",
            message: "Get pizza by id failed",
        });
        return res.status(400).json({ message: error });
    }

});

router.post("/editpizza", async (req, res) => {

    logger.log({
        level: "info",
        message: "Edit pizza called",
    });

    const editedpizza = req.body.editedpizza

    try {
        const pizza = await Pizza.findOne({ _id: editedpizza._id })

        pizza.name = editedpizza.name,
            pizza.description = editedpizza.description,
            pizza.image = editedpizza.image,
            pizza.category = editedpizza.category,
            pizza.prices = [editedpizza.prices]

        await pizza.save()
        logger.log({
            level: "info",
            message: "Pizza details edited successfully",
        });
        res.send('Pizza Details Edited successfully')

    } catch (error) {
        logger.log({
            level: "error",
            message: "Edit pizza failed",
        });
        return res.status(400).json({ message: error });
    }

});

router.post("/deletepizza", async (req, res) => {
    logger.log({
        level: "info",
        message: "Delete pizza called",
    });

    const pizzaid = req.body.pizzaid

    try {
        await Pizza.findOneAndDelete({ _id: pizzaid })
        logger.log({
            level: "info",
            message: "Pizza deleted successfully",
        });
        res.send('Pizza Deleted successfully')
    } catch (error) {
        return res.status(400).
        logger.log({
            level: "error",
            message: "Delete pizza failed",
        });json({ message: error });
    }

});




module.exports = router;
