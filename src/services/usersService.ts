import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { User } from "../types/User.type";

const prisma = new PrismaClient();

export default class {
    async create({
        balance,
        cpf,
        email,
        name,
        password,
        type,
    }: User): Promise<PrismaUser> {
        // Checks if the balance value is
        if (balance < 0) throw new Error("Invalid balance value");
        //Check if there's another user with the same info
        const duplicatedUser = await prisma.user.findUnique({
            where: { cpf: cpf, OR: [{ email: email }] },
        });
        if (duplicatedUser) throw new Error("Duplicated info");

        // Create and return the created user
        return await prisma.user.create({
            data: { balance, cpf, email, name, password, type },
        });
    }

    async getUserById(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                balance: true,
                name: true,
                type: true,
            },
        });

        // Checks if the user exists
        if (!user) throw new Error("User not found.");

        return user;
    }

    async getBalance(userId: number) {
        return await this.getUserById(userId).then((user) => {
            return user?.balance;
        });
    }

    async addBalance(userId: number, amount: number) {
        const user = await this.getUserById(userId);

        // Checks if user exists
        if (user === null) {
            throw new Error("Invalid User.");
        }

        // Adds the amount to the user object
        user.balance += amount;

        // Updates the user
        await prisma.user.update({
            data: {
                balance: user.balance,
            },
            where: {
                id: userId,
            },
        });
    }

    async removeBalance(
        userId: number,
        amount: number,
        isTransaction: boolean
    ) {
        const user = await this.getUserById(userId);

        // Checks if the user exists
        if (user === null) throw new Error("Invalid User");
        // Checks if the user is a shopkeeper
        if (user.type == "shopkeeper" && isTransaction)
            throw new Error("This user can't send transactions.");
        // Checks if the user has the amount
        if (user.balance - amount < 0) throw new Error("Insufficient funds");

        // Removes the amount from the user object
        user.balance -= amount;

        // Updates the user
        return await prisma.user.update({
            data: {
                balance: user.balance,
            },
            where: {
                id: userId,
            },
        });
    }
}
