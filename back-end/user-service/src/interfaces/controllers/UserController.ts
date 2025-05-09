import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../../domain/entities/User";
import { LoadUser } from "../../application/use-cases/LoadUser";
import { AddUser } from "../../application/use-cases/addUser";
import { UpdateUser } from "../../application/use-cases/UpdateUser";

interface UserParams {
    userId: string;
}

export class UserController {
    private getUser: LoadUser;
    private saveUser: AddUser;
    private updateUser: UpdateUser;
    constructor(getUser: LoadUser, saveUser: AddUser, updateUser: UpdateUser) {
        this.getUser = getUser;
        this.saveUser = saveUser;
        this.updateUser = updateUser;
    }
    async getUserHandler(req: FastifyRequest<{Params: UserParams}>, reply: FastifyReply) {
        try {
            const userId = req.params.userId as string;
            const messages = await this.getUser.execute(userId);
            reply.send(messages);
        } catch (error) {
            reply.status(500).send({ error: "Error al obtener mensajes" });
        }
    }
    async saveUserHandler(req: FastifyRequest, reply: FastifyReply) {
        try {
            console.log(req.body);
            const user: User = JSON.parse(req.body.toString());
            const chat = await this.saveUser.execute(user);
            reply.send(chat);
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: "Error al Guardar el usuario" });
        }
    }
    async updateUserHandler(req: FastifyRequest<{Params: UserParams}>, reply: FastifyReply) {
        try {
            console.log(req.body);
            const user: User = JSON.parse(req.body.toString());
            const chat = await this.updateUser.execute(req.params.userId , user);
            reply.send(chat);
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: "Error al Guardar el usuario" });
        }
    }
}
