import request from 'supertest'
import app from '../app'
import { sequelize } from '../models';
import User from '../models/user';

let randUser: number = Math.floor(Math.random() * 100);

beforeAll(async () => {
    await sequelize.sync({ force: true })
})

afterAll(async () => {
    await sequelize.close();
})

describe('Auth Routes', () => {
    it('should regidster a new user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            username: `testuser${randUser}`,
            password: 'password1234'
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user')
    });

    it('should login in a registered user', async () => {
        await User.create({ username: `testuser${randUser}`, password: 'pasword1234' });

        const res = await request(app).post('/api/auth/login').send({
            username: `testuser${randUser}`,
            password: 'password1234'
        })

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    })
})