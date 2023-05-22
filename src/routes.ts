import { CreateUser } from "./controllers/userController/CreateUserController";
import { AuthenticateUser } from "./controllers/userController/AuthenticateUserController";
import { ensureAuthenticateUser } from "./middleware/ensureAuthenticateUser"
import { CreateList } from "./controllers/listController/CreateLIstController";
import { Router } from "express";
import { GetAllLists } from "./controllers/listController/GetAllListsController";
import { UpdateList } from "./controllers/listController/UpdateListController";
import { DeleteList } from "./controllers/listController/DeleteListController";
import { CreateItem } from "./controllers/itemController/CreateItemController";
import { DeleteItem } from "./controllers/itemController/DeleteItemController";
import { GetAllItens } from "./controllers/itemController/GetAllItensController";
import { UpdateItem } from "./controllers/itemController/UpdateItemController";


export const routes = Router();

routes.post("/users", CreateUser)
routes.post("/login/users", AuthenticateUser)

routes.get("/lists", ensureAuthenticateUser, GetAllLists)
routes.post("/list", ensureAuthenticateUser, CreateList)
routes.put("/list/:list_id", ensureAuthenticateUser, UpdateList)
routes.delete("/list/:list_id", ensureAuthenticateUser, DeleteList)

routes.get("/itens/:list_id", ensureAuthenticateUser, GetAllItens)
routes.post("/item/:list_id", ensureAuthenticateUser, CreateItem)
routes.put("/item/:item_id", ensureAuthenticateUser, UpdateItem)
routes.delete("/item/:item_id", ensureAuthenticateUser, DeleteItem)
