import express from "express";
import { AppDataSource } from "../data-source";
import { JounalEntry } from "../entity/JournalEntry";
import { User } from "../entity/User";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router()

router.post("/", verifyToken, async (req, res) => {
    const {title, content, category, date} = req.body
    const userId = req.userId;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });

    if(!user) return res.status(400).send({ message: "User not found!" });

    const journalEntry = new JounalEntry();
    journalEntry.title = title;
    journalEntry.content = content;
    journalEntry.category = category;
    journalEntry.date = new Date(date);
    journalEntry.user = user;

    const journalRepo = AppDataSource.getRepository(JounalEntry);
    await journalRepo.save(journalEntry);

    res.send({ message: "Journal entry created successfully!" })
});

router.get("/entries", verifyToken, async (req, res) => {
    const userId = req.userId;
    const journalRepo = AppDataSource.getRepository(JounalEntry)
    const entries = await journalRepo.find({
        where: { user: { id: userId } },
    })
    res.send(entries);
})

export default router;