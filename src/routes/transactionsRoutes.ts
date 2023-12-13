import express, { Request, Response } from "express";
import { Transaction } from "../types/Transaction.type";
import transactionsService from "../services/transactionsService";

const transactions = new transactionsService();
const transactionsRouter = express.Router();

transactionsRouter.get("/all", async (req: Request, res: Response) => {
    res.send(await transactions.getAllTransactions());
});

transactionsRouter.post("/create", async (req: Request, res: Response) => {
    const transaction: Transaction = await req.body;

    if (!transaction.payee || !transaction.payer || !transaction.amount) {
        return res.sendStatus(422).send({
            message: "Missing parameters: payee, payer or amount.",
        });
    }

    try {
        await transactions.createTransaction(transaction);
        return res.send({
            success: true,
        });
    } catch (error) {
        if (error === "Insufficient funds") {
            return res.sendStatus(402);
        } else {
            return res.sendStatus(500);
        }
    }
});

transactionsRouter.post("/revert", async (req: Request, res: Response) => {
    if (!req.body.transactionId) {
        return res.status(400).send("Missing transactionId");
    }

    try {
        res.status(200).send(
            await transactions.revertTransaction(req.body.transactionId)
        );
    } catch (e: any) {
        res.sendStatus(500);
    }
});

export default transactionsRouter;
