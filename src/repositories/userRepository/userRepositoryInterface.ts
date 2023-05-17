import { Prisma, Users } from "@prisma/client";

export interface IUserRepository {
    findByEmail(email: string): Promise<Users | null>
    findById(id: string): Promise<Users | null>
    createUser(data: Prisma.UsersCreateInput): Promise<Users>
}