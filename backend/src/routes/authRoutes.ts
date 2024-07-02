import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User();
    user.username = username;
    user.password = hashedPassword;

    const userRepo = AppDataSource.getRepository(User)
    await userRepo.save(user)

    res.send({ message: "User redistered successfully" });
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    const userRepo = AppDataSource.getRepository(User)

    const user = await userRepo.findOneBy({ username })
    if(!user) return res.status(400).send({ message: "User not found!" });

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) return res.status(400).send({ message: "Invalid Password!" });

    const token = jwt.sign({ userId: user.id }, "sntaks@5876", { expiresIn: "1h" })

    res.send({ token })
})

export default router;