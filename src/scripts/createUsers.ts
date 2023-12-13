import { User } from "../types/User.type";
import usersService from "../services/usersService";

const userService = new usersService();

(async () => {
    const user1Info: User = {
        balance: 0,
        cpf: "12345678901",
        email: "user1@gmail.com",
        name: "TESTUSER",
        password: "password",
        type: "user",
    };
    const user2Info: User = {
        balance: 100,
        cpf: "12345678902",
        email: "user2@gmail.com",
        name: "TESTUSER",
        password: "password",
        type: "user",
    };
    const shopkeeper1Info: User = {
        balance: 50,
        cpf: "12345678903",
        email: "shopkeeper1@gmail.com",
        name: "TESTUSER",
        password: "password",
        type: "shopkeeper",
    };
    const shopkeeper2Info: User = {
        balance: 0,
        cpf: "12345678904",
        email: "shopkeeper2@gmail.com",
        name: "TESTUSER",
        password: "password",
        type: "shopkeeper",
    };
    
    const users = {
        user1: await userService.create(user1Info),
        user2: await userService.create(user2Info),
        shopkeeper1: await userService.create(shopkeeper1Info),
        shopkeeper2: await userService.create(shopkeeper2Info),   
    }

    console.log(JSON.stringify(users))
})()