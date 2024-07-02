import request from "supertest";
import app from "../app";
import { sequelize } from "../models";
import {User} from "../models";
import {JournalEntry} from "../models";


let randUser: number = Math.floor(Math.random() * 10);
let token: string

beforeAll(async () => {
    await sequelize.sync({ force: true });
    const user = await User.create({ username: `testuser${randUser}`, password: 'password123' });

    const res = await request(app).post('/api/auth/login').send({
        username: `testuser${randUser}`,
        password: 'password1234'
    });

    token = res.body.token;
});

afterAll(async () => {
    await sequelize.close();
});

describe('Journal Routes', () => {
    it('should create a journal entry', async () => {
        const res = await request(app).post('/api/journals/').set('Authorization', `Bearer ${token}`).send({
            title: 'First Entry',
            content: 'This is my first journal entry.',
            category: 'Personal',
            date: '2024-07-01'
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Journal Entry Created');
    });

    it('should get journal entries', async () => {
        await JournalEntry.create({
            title: 'First Entry',
            content: 'This is my first journal entry.',
            category: 'Personal',
            date: new Date('2024-07-01'),
            userId: 1
        });

        const res = await request(app).get('/api/journals/entries').set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        //expect(res.body).toHaveLength(1);
    });
});