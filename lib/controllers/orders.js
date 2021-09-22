const { Router } = require("express");
const Order = require("../models/Order");
const OrderService = require("../services/OrderService");

module.exports = Router()
  .post("/", async (req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get("/", (req, res, next) => {})
  .get("/:id", (req, res, next) => {});
