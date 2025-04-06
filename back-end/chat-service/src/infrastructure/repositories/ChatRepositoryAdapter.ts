import { ChatRepositoryPort } from "../../application/ports/ChatRepositoryPort";
import { Chat } from "../../domain/entities/Chat";
import { Message } from "../../domain/entities/Message";
import ChatSingleton from "../db/ChatSingleton";


export class ChatRepositoryAdapter implements ChatRepositoryPort {
    private chatSingleton: ChatSingleton;
    constructor() {
        this.init();
    }
    deleteChatById(userId: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async saveChat(chat: Chat): Promise<void> {
        await this.chatSingleton.addChat(chat);
    }

    async getChatByMembers(userIds: string[]): Promise<Chat[]> {
        const chats = await this.chatSingleton.getAllChats();
        const chat:Chat[] = chats.filter(chat => 
            userIds.every(userId => chat.users.includes(userId))
        ) || null;
        if (!chat) {
            throw new Error(`Chat with ID: ${userIds} not found.`);
        }
        return chat;
    }


    private async init() {
        this.chatSingleton = await ChatSingleton.getInstance();
    }
    
    async saveMessage(chatId: string, message: string): Promise<void> {
        if (!this.chatSingleton) {
            this.chatSingleton = await ChatSingleton.getInstance();
        }
        await this.chatSingleton.addMessageToChat(chatId, {
            content: { text: message },
            sendToUserId: "1", // Debes pasarlo dinámicamente
            fromUserId: "2",  // Debes pasarlo dinámicamente
            chatId
        });
    }
    async getChatById(chatId: string): Promise<Chat> {
        if (!this.chatSingleton) {
            this.chatSingleton = await ChatSingleton.getInstance();
        }
        const chat = await this.chatSingleton.getChatById(chatId);
        if (!chat) {
            throw new Error(`Chat with ID ${chatId} not found.`);
        }
        return chat;
    }

    async getMessages(chatId) {
        return await this.chatSingleton.getChatById(chatId);
    }

    
    async getMessagesByChatId(chatId: string): Promise<Message[]> {
        return (await this.chatSingleton.getChatById(chatId)).messages;
    }
}