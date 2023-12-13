import { expect, test, describe } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import transactionsService from "../../services/transactionsService";
import usersService from "../../services/usersService";
import { User } from "../../types/User.type";

const transactionService = new transactionsService();
const userService = new usersService();
const prisma = new PrismaClient();

describe("Transactions service tests", () => {
    test("Successfully transfer", async () => {
        // Creating an user for tests
        const userInfo1: User = {
            balance: 0,
            cpf: "22345678901",
            email: "transferTest@gmail.com",
            name: "TESTTRANSFER",
            password: "password",
            type: "shopkeeper",
        };
        const userInfo2: User = {
            balance: 50,
            cpf: "22345678902",
            email: "transferTest2@gmail.com",
            name: "TESTTRANSFER",
            password: "password",
            type: "user",
        };
        const testUser1 = await userService.create(userInfo1);
        const testUser2 = await userService.create(userInfo2);

        const transaction = await transactionService.createTransaction({
            amount: 10,
            payee: testUser1.id,
            payer: testUser2.id,
        });

        expect(transaction).toBeDefined();
        expect(transaction.amount).toBe(10);
        expect(transaction.payee).toBe(testUser1.id);
        expect(transaction.payer).toBe(testUser2.id);

        // Delete test accounts
        await prisma.user.deleteMany({ where: { name: "TESTTRANSFER" } });
        // Delete transactions
        await prisma.transactions.deleteMany({where: {payee: testUser1.id}})
    });

    test("fail to transfer from an empty account", async () => {
        // Creating an user for tests
        const userInfo1: User = {
            balance: 0,
            cpf: "22345678901",
            email: "transferTest@gmail.com",
            name: "TESTTRANSFER",
            password: "password",
            type: "shopkeeper",
        };
        const userInfo2: User = {
            balance: 0,
            cpf: "22345678902",
            email: "transferTest2@gmail.com",
            name: "TESTTRANSFER",
            password: "password",
            type: "user",
        };
        const testUser1 = await userService.create(userInfo1);
        const testUser2 = await userService.create(userInfo2);

        try {
            await transactionService.createTransaction({
                amount: 10,
                payee: testUser1.id,
                payer: testUser2.id,
            });
        } catch (e: any) {
            expect(e).toBeDefined();
            expect(e.message).toBe("Insufficient funds");
        }

        // Delete test accounts
        await prisma.user.deleteMany({ where: { name: "TESTTRANSFER" } });
        // Delete transactions
        await prisma.transactions.deleteMany({where: {payee: testUser1.id}})
    });

    test("fail to transfer from an empty account", async () => {
        // Creating an user for tests
        const userInfo1: User = {
            balance: 0,
            cpf: "22345678901",
            email: "transferTest3@gmail.com",
            name: "TESTTRANSFER",
            password: "password",
            type: "shopkeeper",
        };
        const userInfo2: User = {
            balance: 0,
            cpf: "22345678902",
            email: "transferTest4@gmail.com",
            name: "TESTTRANSFER",
            password: "password",
            type: "user",
        };
        const testUser1 = await userService.create(userInfo1);
        const testUser2 = await userService.create(userInfo2);

        try {
            await transactionService.createTransaction({
                amount: 10,
                payee: testUser1.id,
                payer: testUser2.id,
            });
        } catch (e: any) {
            expect(e).toBeDefined();
            expect(e.message).toBe("Insufficient funds");
        }

        // Delete test accounts
        await prisma.user.deleteMany({ where: { name: "TESTTRANSFER" } });
        // Delete transactions
        await prisma.transactions.deleteMany({where: {payee: testUser1.id}})
    });

    test("fail to transfer from an shopkeeper account", async () => {
        // Creating an user for tests
        const userInfo1: User = {
            balance: 0,
            cpf: "22345678901",
            email: "transferTest5@gmail.com",
            name: "TESTTRANSFER",
            password: "password",
            type: "shopkeeper",
        };
        const userInfo2: User = {
            balance: 10,
            cpf: "22345678902",
            email: "transferTest6@gmail.com",
            name: "TESTTRANSFER",
            password: "password",
            type: "shopkeeper",
        };
        const testUser1 = await userService.create(userInfo1);
        const testUser2 = await userService.create(userInfo2);

        try {
            await transactionService.createTransaction({
                amount: 10,
                payee: testUser1.id,
                payer: testUser2.id,
            });
        } catch (e: any) {
            expect(e).toBeDefined();
            expect(e.message).toBe("This user can't send transactions");
        }

        // Delete test accounts
        await prisma.user.deleteMany({ where: { name: "TESTTRANSFER" } });
        // Delete transactions
        await prisma.transactions.deleteMany({where: {payee: testUser1.id}})
    });
});
