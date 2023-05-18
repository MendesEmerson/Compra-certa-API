import { CreateUser } from "./controllers/userController/CreateUserController";
import { AuthenticateUser } from "./controllers/userController/AuthenticateUserController";
import { ensureAuthenticateUser } from "./middleware/ensureAuthenticateUser"
import { CreateList } from "./controllers/listController/CreateLIstController";
import { Router } from "express";
import { GetAllLists } from "./controllers/listController/GetAllListsController";
import { UpdateList } from "./controllers/listController/UpdateListController";
import { DeleteList } from "./controllers/listController/DeleteListController";


export const routes = Router();

routes.post("/users", CreateUser)
routes.post("/login/users", AuthenticateUser)

routes.get("/lists", ensureAuthenticateUser, GetAllLists)
routes.post("/list", ensureAuthenticateUser, CreateList)
routes.put("/list/:list_id", ensureAuthenticateUser, UpdateList)
routes.delete("/list/:list_id", ensureAuthenticateUser, DeleteList)
