import express, { Request, Response } from "express";
import usersService from "../services/usersService";

const userRouter = express.Router();
const userService = new usersService();

userRouter.post("/", async (req: Request, res: Response) => {
    if (!req.body.userId) return res.status(400).send("Missing userId");

    try {
        return res.send(await userService.getUserById(req.body.userId));
    } catch (e: any) {
        return res.sendStatus(500);
    }
});

export default userRouter;
