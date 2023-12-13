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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const usersService_1 = __importDefault(require("./usersService"));
const prisma = new client_1.PrismaClient();
const user = new usersService_1.default();
class default_1 {
    createTransaction({ amount, payee, payer }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Checks if the amount is greater than 0
            if (amount <= 0)
                throw new Error("Invalid Amount");
            // Checks if the user is a shopkeeper
            if (((_a = (yield user.getUserById(payer))) === null || _a === void 0 ? void 0 : _a.type) == "shopkeeper")
                throw new Error("This user can't send transactions");
            // If the payer hasn't the amount, the payee will not receive the transaction.
            if (yield user.removeBalance(payer, amount, true))
                user.addBalance(payee, amount);
            return yield prisma.transactions.create({
                data: { amount, payee, payer },
            });
        });
    }
    revertTransaction(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Gets transaction
            const transaction = yield prisma.transactions.findUnique({
                where: { id: transactionId },
            });
            // Checks if transaction exists
            if (transaction === null)
                throw new Error("Invalid Transaction");
            // Removes the amount from the payer account and adds to payee's account
            user.addBalance(transaction.payer, transaction.amount);
            user.removeBalance(transaction.payee, transaction.amount, false);
            return yield prisma.transactions.create({
                data: {
                    amount: transaction.amount,
                    payer: transaction.payee,
                    payee: transaction.payer,
                },
            });
        });
    }
    getAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.transactions.findMany();
        });
    }
}
exports.default = default_1;
