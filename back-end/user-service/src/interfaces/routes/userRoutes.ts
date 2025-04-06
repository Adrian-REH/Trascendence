
import { FastifyInstance } from "fastify";
import { UserRepositoryAdapter } from "../../infrastructure/repositories/UserRepositoryAdapter";
import { LoadUser } from "../../application/use-cases/LoadUser";
import { UserController } from "../controllers/UserController";
import { AddUser } from "../../application/use-cases/addUser";
import { UpdateUser } from "../../application/use-cases/UpdateUser";

export async function userRoutes(fastify: FastifyInstance) {
    const userRepo = new UserRepositoryAdapter();
    const getUser = new LoadUser(userRepo);
    const saveUser = new AddUser(userRepo);
    const updateUser = new UpdateUser(userRepo);
    const userController = new UserController(getUser, saveUser, updateUser);

    fastify.get("/api/v1/users/:userId", userController.getUserHandler.bind(userController));
    fastify.post("/api/v1/users/save-user", userController.saveUserHandler.bind(userController));
    fastify.post("/api/v1/users/:userId", userController.updateUserHandler.bind(userController));
}