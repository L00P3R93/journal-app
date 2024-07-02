import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body

        //Check if user already exists
        const existingUser = await User.findOne({ where: { username } })
        if(existingUser) return res.status(400).send({ message: "User already exists" });

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create New User
        const user = await User.create({ username, password: hashedPassword });
        res.status(200).send({ message: "User registered Successfully", user });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error: ", error })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        //Retrieve & Check User
        const user = await User.findOne({ where: { username } });
        if(!user) res.status(400).send({ message: "Invalid username or password!" });

        //Check Password
        const isValidPassword = await bcrypt.compare(password, user!.password);
        if(!user) return res.status(400).send({ message: "Invalid username or password!" })

        //Generate JWT Token
        const token = jwt.sign({ userId: user.id }, 'sntaks@5876', { expiresIn: '1h' });
        res.status(200).send({ token })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
}