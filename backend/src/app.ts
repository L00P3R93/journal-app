import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import journalRoutes from './routes/journalRoutes'
import authRoutes from './routes/authRoutes'
import { initModels } from './models'

dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use('/api/journals', journalRoutes);
app.use('/api/auth', authRoutes);

initModels().then(() => {
    console.log('[!] Database Synched');
})

export default app