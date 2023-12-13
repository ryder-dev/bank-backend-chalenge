"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class default_1 {
    create({ balance, cpf, email, name, password, type, }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Checks if the balance value is
            if (balance < 0)
                throw new Error("Invalid balance value");
            //Check if there's another user with the same info
            const duplicatedUser = yield prisma.user.findUnique({
                where: { cpf: cpf, OR: [{ email: email }] },
            });
            if (duplicatedUser)
                throw new Error("Duplicated info");
            // Create and return the created user
            return yield prisma.user.create({
                data: { balance, cpf, email, name, password, type },
            });
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    balance: true,
                    name: true,
                    type: true,
                },
            });
            // Checks if the user exists
            if (!user)
                throw new Error("User not found.");
            return user;
        });
    }
    getBalance(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getUserById(userId).then((user) => {
                return user === null || user === void 0 ? void 0 : user.balance;
            });
        });
    }
    addBalance(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            // Checks if user exists
            if (user === null) {
                throw new Error("Invalid User.");
            }
            // Adds the amount to the user object
            user.balance += amount;
            // Updates the user
            yield prisma.user.update({
                data: {
                    balance: user.balance,
                },
                where: {
                    id: userId,
                },
            });
        });
    }
    removeBalance(userId, amount, isTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            // Checks if the user exists
            if (user === null)
                throw new Error("Invalid User");
            // Checks if the user is a shopkeeper
            if (user.type == "shopkeeper" && isTransaction)
                throw new Error("This user can't send transactions.");
            // Checks if the user has the amount
            if (user.balance - amount < 0)
                throw new Error("Insufficient funds");
            // Removes the amount from the user object
            user.balance -= amount;
            // Updates the user
            return yield prisma.user.update({
                data: {
                    balance: user.balance,
                },
                where: {
                    id: userId,
                },
            });
        });
    }
}
exports.default = default_1;
