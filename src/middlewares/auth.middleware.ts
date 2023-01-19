import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Decode the jwt if present
        const decoded: any = jwt.verify(
            req.cookies["auth_token"],
            String(process.env.JWT_SECRET)
        );
        if (!decoded.username) {
            res.redirect("/login?message=Login with admin credentials");
        } else {
            next();
        }
    } catch (error) {
        res.redirect("/login?message=Login with admin credentials");
    }
}