import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';

const server = http.createServer(app);
const io = new Server(server);

// Configurar Socket.IO para manejar conexiones WebSocket
io.on('connection', (socket) => {
    console.log('Cliente conectado a través de WebSocket');
    let productIdCounter = 1
    // Manejar el evento cuando se agrega un producto
    socket.on('productAdded', (product) => {
        product.id = productIdCounter++;
        console.log('Evento productAdded emitido:', product);
        io.emit('updateProducts', product);
    });

    // Manejar el evento cuando se elimina un producto
    socket.on('productRemoved', (productId) => {
        // Emitir el evento a todos los clientes conectados
        io.emit('updateProducts', { removedProductId: productId });
    });
});
