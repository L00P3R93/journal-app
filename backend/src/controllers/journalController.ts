import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { JournalEntry, User } from "../models";

export const createJournalEntry = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, content, category, date } = req.body;
        const userId = req.userId;

        //Fetch User
        const user = await User.findByPk(userId)
        if(!user) return res.status(400).send({ message: "User Not Found" });

        //Create Journal Entry
        const journalEntry = await JournalEntry.create({
            title,
            content,
            category,
            date: new Date(date),
            userId: user.id
        });
        res.status(200).send({ message: "Journal Entry Created", journalEntry })
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'});
    }
}

export const getJournalEntries = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;
        //Fetch all Journal Entries created by User.
        const entries = await JournalEntry.findAll({ where: { userId } })
        res.status(200).send(entries)
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'});
    }
}