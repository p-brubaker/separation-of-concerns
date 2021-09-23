const express = require('express');

const app = express();

//req.body = JSON.parse(body)
app.use(express.json());

//http://localhost:5555/api/v1/orders
app.use('/api/v1/orders', require('./controllers/orders.js'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

//http://localhost:5555/api/v1/orders/
