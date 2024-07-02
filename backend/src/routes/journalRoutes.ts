import express from 'express';
import { createJournalEntry, getJournalEntries } from '../controllers/journalController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router()

router.post('/', verifyToken, createJournalEntry);
router.get('/entries', verifyToken, getJournalEntries);

export default router;