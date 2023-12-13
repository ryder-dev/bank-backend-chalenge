import { $Enums } from "@prisma/client"

export type User = {
    id?: number,
    balance: number,
    cpf: string,
    email: string,
    name: string,
    password: string,
    type: $Enums.UserTypes
}