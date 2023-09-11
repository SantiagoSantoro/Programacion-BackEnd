import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRoutes from './routes/viewsRoutes.js'
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import messagesRoutes from './routes/messagesroutes.js'; // Cambiar el nombre del archivo de rutas
import __dirname from './utils.js';
import mongoose from 'mongoose';



const app = express();
const server = http.createServer(app);
const io = new Server(server); // Configura Socket.IO
const port = 8080;

//Conecto a Mongoose
const connection = mongoose.connect('mongodb+srv://santiagosantoro:Milo2017@clustercursobackend.mg6v7fe.mongodb.net/ecommerce')

//Midleware para trabajar con express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

//Configuro Handlebars, motor y enlace
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Importo vistas
app.use('/', viewsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api', messagesRoutes);

// Levanto servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Configurar Socket.IO para manejar conexiones WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado a través de WebSocket');
  let productIdCounter = 1;
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

export default app;

