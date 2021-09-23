const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
    messages: {
        create: jest.fn(),
    },
}));

describe('03_separation-of-concerns-demo routes', () => {
    beforeEach(async () => {
        await setup(pool);
        return Promise.all(
            [{ quantity: 12 }, { quantity: 100 }, { quantity: 3 }].map(
                (order) => {
                    return request(app).post('/api/v1/orders').send(order);
                }
            )
        );
    });

    it('creates a new order in our database and sends a text message', () => {
        return request(app)
            .post('/api/v1/orders')
            .send({ quantity: 10 })
            .then((res) => {
                // expect(createMessage).toHaveBeenCalledTimes(1);
                expect(res.body).toEqual({
                    id: expect.any(String),
                    quantity: 10,
                });
            });
    });

    it('should get all orders', () => {
        return request(app)
            .get('/api/v1/orders')
            .then((res) => {
                expect(res.body).toEqual([
                    { id: expect.any(String), quantity: 12 },
                    { id: expect.any(String), quantity: 100 },
                    { id: expect.any(String), quantity: 3 },
                ]);
            });
    });

    it('should get an order by id', () => {
        return request(app)
            .get('/api/v1/orders/1')
            .then((res) => {
                expect(res.body).toEqual({
                    id: '1',
                    quantity: 12,
                });
            });
    });

    it('should patch an order by id', () => {
        return request(app)
            .patch('/api/v1/orders/1')
            .send({ quantity: 1000 })
            .then((res) => {
                expect(res.body).toEqual({
                    id: '1',
                    quantity: 1000,
                });
            });
    });
});
