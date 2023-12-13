import { PrismaClient } from "@prisma/client";
import userService from "./usersService";
import { Transaction } from "../types/Transaction.type";

const prisma = new PrismaClient();
const user = new userService();

export default class {
    async createTransaction({ amount, payee, payer }: Transaction) {
        // Checks if the amount is greater than 0
        if (amount <= 0) throw new Error("Invalid Amount");
        // Checks if the user is a shopkeeper
        if ((await user.getUserById(payer))?.type == "shopkeeper")
            throw new Error("This user can't send transactions");

        // If the payer hasn't the amount, the payee will not receive the transaction.
        if (await user.removeBalance(payer, amount, true))
            user.addBalance(payee, amount);

        return await prisma.transactions.create({
            data: { amount, payee, payer },
        });
    }

    async revertTransaction(transactionId: number) {
        // Gets transaction
        const transaction = await prisma.transactions.findUnique({
            where: { id: transactionId },
        });

        // Checks if transaction exists
        if (transaction === null) throw new Error("Invalid Transaction");

        // Removes the amount from the payer account and adds to payee's account
        user.addBalance(transaction.payer, transaction.amount);
        user.removeBalance(transaction.payee, transaction.amount, false);

        return await prisma.transactions.create({
            data: {
                amount: transaction.amount,
                payer: transaction.payee,
                payee: transaction.payer,
            },
        });
    }

    async getAllTransactions() {
        return await prisma.transactions.findMany();
    }
}
