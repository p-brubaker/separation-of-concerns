const Order = require('../models/Order');
const pool = require('../utils/pool');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
    //send a text and store the order

    static async createOrder({ quantity }) {
        //send text
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER,
            `New Order received for ${quantity}`
        );

        //store the order
        const order = await Order.insert({ quantity });

        return order;
    }

    static async getAllOrders() {
        const { rows } = await pool.query('SELECT * FROM orders');
        return rows;
    }

    static async getOrderById(id) {
        const { rows } = await pool.query('Select * FROM orders WHERE id=$1', [
            id,
        ]);
        return rows[0];
    }

    static async patchOrderById(id, changes) {
        const { rows } = await pool.query(
            'UPDATE orders SET quantity=$1 WHERE id=$2 RETURNING *',
            [changes.quantity, id]
        );
        return rows[0];
    }

    static async deleteOrderById(id) {
        return await pool.query('DELETE FROM orders WHERE id=$1', [id]);
    }
};
