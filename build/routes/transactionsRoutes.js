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
const express_1 = __importDefault(require("express"));
const transactionsService_1 = __importDefault(require("../services/transactionsService"));
const transactions = new transactionsService_1.default();
const transactionsRouter = express_1.default.Router();
transactionsRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield transactions.getAllTransactions());
}));
transactionsRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield req.body;
    if (!transaction.payee || !transaction.payer || !transaction.amount) {
        return res.sendStatus(422).send({
            message: "Missing parameters: payee, payer or amount.",
        });
    }
    try {
        yield transactions.createTransaction(transaction);
        return res.send({
            success: true,
        });
    }
    catch (error) {
        if (error === "Insufficient funds") {
            return res.sendStatus(402);
        }
        else {
            return res.sendStatus(500);
        }
    }
}));
transactionsRouter.post("/revert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.transactionId) {
        return res.status(400).send("Missing transactionId");
    }
    try {
        res.status(200).send(yield transactions.revertTransaction(req.body.transactionId));
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
exports.default = transactionsRouter;
