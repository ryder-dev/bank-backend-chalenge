import { expect, test, describe } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import usersService from "../../services/usersService";
import { User } from "../../types/User.type";

const userService = new usersService();
const prisma = new PrismaClient();

describe("User Tests", () => {
    describe("User Creation Tests", () => {
        test("Successfully create new user", async () => {
            // Delete previous test users
            await prisma.user.deleteMany({ where: { name: "TESTUSER" } });

            // Creating an user for tests
            const userInfo: User = {
                balance: 0,
                cpf: "12345678901",
                email: "userTest@gmail.com",
                name: "TESTUSER",
                password: "password",
                type: "user",
            };
            const testUser = await userService.create(userInfo);

            expect(testUser).toBeDefined();
            expect(testUser.id).toBeDefined();
            expect(testUser.cpf).toBe("12345678901");
            expect(testUser.email).toBe("userTest@gmail.com");
            expect(testUser.name).toBe("TESTUSER");
            expect(testUser.password).toBe("password");
            expect(testUser.type).toBe("user");
        });

        test("Fail to create user with duplicated info", async () => {
            const userInfo: User = {
                balance: 0,
                cpf: "12345678901",
                email: "userTest@gmail.com",
                name: "TESTUSER",
                password: "password",
                type: "user",
            };

            try {
                await userService.create(userInfo);
            } catch (e: any) {
                expect(e).toBeDefined();
                expect(e.message).toBe("Duplicated info");
            }

            // Delete test user
            await prisma.user.deleteMany({ where: { name: "TESTUSER" } });
        });

        test("Fail to create user with negative balance", async () => {
            // Test user info
            const userInfo: User = {
                balance: -10,
                cpf: "12345678902",
                email: "userTest2@gmail.com",
                name: "TESTUSER",
                password: "password",
                type: "user",
            };

            try {
                await userService.create(userInfo);
            } catch (e: any) {
                expect(e).toBeDefined();
                expect(e.message).toBe("Invalid balance value");
            }
        });
    });

    describe("Balance Tests", () => {
        test("Successfully remove balance", async () => {
            // Creating an user for tests
            const userInfo: User = {
                balance: 100,
                cpf: "12345678903",
                email: "userTest3@gmail.com",
                name: "TESTUSER",
                password: "password",
                type: "user",
            };
            const testUser = await userService.create(userInfo);

            expect(
                await userService.removeBalance(testUser.id, 100, true)
            ).toBeDefined();

            // Delete test user
            await prisma.user.deleteMany({ where: { name: "TESTUSER" } });
        });

        test("Fail to remove balance from an empty account", async () => {
            // Creating an user for tests
            const userInfo: User = {
                balance: 100,
                cpf: "12345678903",
                email: "userTest3@gmail.com",
                name: "TESTUSER",
                password: "password",
                type: "user",
            };
            const testUser = await userService.create(userInfo);

            try {
                await userService.removeBalance(testUser.id, 100, true);
            } catch (e: any) {
                expect(e).toBeDefined();
                expect(e.message).toBe("Insufficient funds");
            }

            // Delete test user
            await prisma.user.deleteMany({ where: { name: "TESTUSER" } });
        });
    });
});
