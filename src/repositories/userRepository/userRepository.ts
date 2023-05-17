import { Users, Prisma, PrismaClient } from "@prisma/client";
import { IUserRepository } from "./userRepositoryInterface";
import { prisma } from "../../lib/prisma";

export class UserRepository implements IUserRepository {
    async findById(id: string): Promise<Users | null> {
        const user = await prisma.users.findUnique({
            where:{
                id
            }
        })
        return user
    }
    async findByEmail(email: string): Promise<Users | null> {
        const user = await prisma.users.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
        const user = await prisma.users.create({
            data
        })
        return user
    }

}