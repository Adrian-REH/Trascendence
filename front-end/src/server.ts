import Fastify, { FastifyInstance } from "fastify";
import fastifyStatic from '@fastify/static';
import path from 'path';

const fastify: FastifyInstance = Fastify({ logger: true });


fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
  });
  
// Ruta principal
fastify.get('/', async (request, reply) => {
    console.log("Sirviendo el index.html");
return reply.sendFile('./index.html');
});
  
// Iniciar servidor
fastify.listen({ port: 3030 }, ( err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`🚀 Servidor WebSocket corriendo en ${address}`);
});
