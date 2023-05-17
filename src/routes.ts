import { CreateUser } from "./controllers/userController/CreateUserController";
import { AuthenticateUser } from "./controllers/userController/AuthenticateUserController";
import { ensureAuthenticateUser } from "./middleware/ensureAuthenticateUser"
import { CreateList } from "./controllers/listController/CreateLIstController";
import { Router } from "express";
import { GetAllLists } from "./controllers/listController/GetAllListsController";


export const routes = Router();

routes.post("/users", CreateUser)
routes.post("/login/users", AuthenticateUser)

routes.post("/list", ensureAuthenticateUser, CreateList)
routes.get("/lists", ensureAuthenticateUser, GetAllLists)
