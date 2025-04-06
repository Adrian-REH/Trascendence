
import LoadMessage from "../../application/use-cases/LoadMessage";
import { ChatRepositoryAdapter } from "../../infrastructure/repositories/ChatRepositoryAdapter";
import { FastifyInstance } from "fastify";
import { ChatController } from "../controllers/ChatController";
import { LoadChat } from "../../application/use-cases/LoadChat";
import { LoadChatByUserId } from "../../application/use-cases/LoadChatByUserId";

export async function chatRoutes(fastify: FastifyInstance) {
    const messageRepo = new ChatRepositoryAdapter();
    const getMessages = new LoadMessage(messageRepo);
    const getChatById = new LoadChatByUserId(messageRepo);

    const getChat = new LoadChat(messageRepo);
    const chatController = new ChatController(getMessages, getChat, getChatById);

    fastify.get("/chats/:chatId/messages", chatController.getMessagesHandler.bind(chatController));
    fastify.get("/chats/:chatId", chatController.getChatHandler.bind(chatController));
    fastify.get("/chats/user/:userId", chatController.getChatsByIdHandler.bind(chatController));
    //fastify.get('/chats/connect-ws', { websocket: true }, chatController.handleWebSocketConnection.bind(chatController));
}