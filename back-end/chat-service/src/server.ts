import Fastify, { FastifyInstance } from "fastify";
import { chatRoutes } from "./interfaces/routes/chatRoutes";
import { ChatRepositoryAdapter } from "./infrastructure/repositories/ChatRepositoryAdapter";
import { UserRepositoryAdapter } from "./infrastructure/repositories/UserRepositoryAdapter";
import fastifyWebsocket from "@fastify/websocket";
import { chatWebSocketRoutes } from "./interfaces/routes/chatWebSocketRoutes";
import fastifyStatic from '@fastify/static';
import path from 'path';


//Todo: desactivar cors
import cors from '@fastify/cors';

const fastify: FastifyInstance = Fastify({ logger: true ,}); 


fastify.register(cors, {
    origin: 'http://localhost:3030',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

// Instancia del adaptador WebSocket
fastify.register(fastifyWebsocket);
fastify.register(chatWebSocketRoutes);
fastify.register(chatRoutes);


fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
  });
  
// Ruta principal
fastify.get('/', async (request, reply) => {
    console.log("Sirviendo el index.html");
return reply.sendFile('./index.html');
});
  
// Iniciar servidor
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Servidor WebSocket corriendo en ${address}`);
});
