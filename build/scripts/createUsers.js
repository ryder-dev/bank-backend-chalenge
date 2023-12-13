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
const usersService_1 = __importDefault(require("../services/usersService"));
const userService = new usersService_1.default();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const user1Info = {
        balance: 0,
        cpf: "12345678901",
        email: "user1@gmail.com",
        name: "TESTUSER",
        password: "password",
        type: "user",
    };
    const user2Info = {
        balance: 100,
        cpf: "12345678902",
        email: "user2@gmail.com",
        name: "TESTUSER",
        password: "password",
        type: "user",
    };
    const shopkeeper1Info = {
        balance: 50,
        cpf: "12345678903",
        email: "shopkeeper1@gmail.com",
        name: "TESTUSER",
        password: "password",
        type: "shopkeeper",
    };
    const shopkeeper2Info = {
        balance: 0,
        cpf: "12345678904",
        email: "shopkeeper2@gmail.com",
        name: "TESTUSER",
        password: "password",
        type: "shopkeeper",
    };
    const users = {
        user1: yield userService.create(user1Info),
        user2: yield userService.create(user2Info),
        shopkeeper1: yield userService.create(shopkeeper1Info),
        shopkeeper2: yield userService.create(shopkeeper2Info),
    };
    console.log(JSON.stringify(users));
}))();
