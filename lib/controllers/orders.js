const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const order = await OrderService.createOrder(req.body);
            res.send(order);
        } catch (err) {
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const orders = await OrderService.getAllOrders();
            res.send(orders);
        } catch (err) {
            next(err);
        }
    })
    .get('/:id', (req, res, next) => {});
