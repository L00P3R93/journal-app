import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if(!token) return res.status(403).send({ message: "No token provided!" });

    jwt.verify(token, "sntaks@5876", (err, decoded) => {
        if(err) return res.status(401).send({ message: "Unauthorized" });
        req.userId = (decoded as any).userId
        next()
    })
}