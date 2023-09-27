import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import routes from 'express';
import viewsRoutes from './routes/viewsRoutes.js'
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import messagesRoutes from './routes/messagesroutes.js'; 
import __dirname from './utils.js';
import mongoose from 'mongoose';
import { messagesModel } from './dao/models/messages.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import sessionsRoutes from './routes/sessionsRoutes.js'; 



const app = express();
const server = http.createServer(app);
const io = new Server(server); // Configura Socket.IO
const port = 8080;

//Conecto a Mongoose
const connection = mongoose.connect('mongodb+srv://santiagosantoro:Milo2017@clustercursobackend.mg6v7fe.mongodb.net/ecommerce')

// Configuración de la sesión
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://santiagosantoro:Milo2017@clustercursobackend.mg6v7fe.mongodb.net/ecommerce', // URL de la base de datos
      dbName: 'ecommerce', // Nombre de la base de datos
      collectionName: 'session', // Nombre de la colección de sesiones
      ttl: 3000
    }),
    secret: 'CoderSecret',
    resave: false,
    saveUninitialized: false
  })
);

//Midleware para trabajar con express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


//Configuro Handlebars, motor y enlace
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Importo vistas
app.use('/', viewsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api', messagesRoutes);
app.use('/api/sessions', sessionsRoutes);




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

  // Manejar cuando se envía un mensaje
  socket.on("message", async (data) => {
    try {
      // Extraer los datos del objeto data
      const { user, message } = data;

      // Crear una instancia del modelo messagesModel con los datos recibidos
      const nuevoMensaje = new messagesModel({
        user,
        message,
      });

      // Guardar el mensaje en la base de datos
      const savedMessage = await nuevoMensaje.save();

      console.log("Mensaje guardado en MongoDB");

      // Emitir un evento para informar al cliente que el mensaje se guardó con éxito
      io.emit("messageSaved", savedMessage);
    } catch (error) {
      console.error("Error al guardar el mensaje en MongoDB:", error);

      // Emitir un evento de error al cliente si no se pudo guardar el mensaje
      io.emit("messageError", { error: "No se pudo guardar el mensaje." });
    }
  });


});

// Levanto servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

export default app;

