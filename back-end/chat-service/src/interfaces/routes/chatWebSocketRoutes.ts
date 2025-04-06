
import { ChatRepositoryAdapter } from "../../infrastructure/repositories/ChatRepositoryAdapter";
import { FastifyInstance } from "fastify";
import { UserRepositoryAdapter } from "../../infrastructure/repositories/UserRepositoryAdapter";
import { ChatWebSocketController } from "../controllers/ChatWebSocketController";
import { ListenMessage } from "../../application/use-cases/ListenMessage";
import CloseSession from "../../application/use-cases/CloseSession";
import { SessionRepositoryAdapter } from "../../infrastructure/repositories/SessionRepositoryAdapter";
import VerifyConnection from "../../application/use-cases/VerifyConnection";

export async function chatWebSocketRoutes(fastify: FastifyInstance) {
    const listenMessage = new ListenMessage(new ChatRepositoryAdapter(), new SessionRepositoryAdapter());
    const sessionRepository = new SessionRepositoryAdapter();
    const closeSession = new CloseSession(sessionRepository);
    const verifyConnection = new VerifyConnection(new UserRepositoryAdapter(), sessionRepository);
    const chatWSController = new ChatWebSocketController(listenMessage, closeSession, verifyConnection);
    //fastify.register(fastifyWebsocket);

    fastify.get('/chats/connect-ws', { websocket: true }, chatWSController.handleConnection.bind(chatWSController));
}