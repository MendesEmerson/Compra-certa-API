import { FastifyInstance } from "fastify";
import { CreateUser } from "./controllers/userController/CreateUserController";
import { AuthenticateUser } from "./controllers/userController/AuthenticateUserController";

export const appRoutes = async (app: FastifyInstance) => {
    app.post("/users", CreateUser)
    app.post("/login/users", AuthenticateUser)
}