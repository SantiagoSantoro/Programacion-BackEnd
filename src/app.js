import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
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
import passport from 'passport';
import { initializePassport } from './config/passport.js';
import { config } from './config/config.js';
import ticketsRoutes from './routes/ticketsRoutes.js';
import mailer from 'nodemailer'; 
import compression from 'express-compression';
import mockingRoutes  from './routes/mockingRoutes.js';
import  { logger, addLogger } from './utils/logger.js';
import loggerTestRoutes from './routes/loggerTestRoutes.js'
import usersRoutes from './routes/usersRoutes.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server); // Configura Socket.IO
const port = 8080;


//Conecto a Mongoose
const connection = mongoose.connect(config.databaseUrl);


// Configuración de la sesión
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.databaseUrl,
      dbName: 'ecommerce',
      collectionName: 'session',
      ttl: 3000
    }),
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false,
    name: 'user-session',
  })
);


//Midleware para trabajar con passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Midleware para trabajar con express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Middleware para trabajar con compression. Ver si usar brotli o no.
app.use(compression({
  brotli: {enabled: true, zlib: {}}
}));

//Middleware para trabajar con winston
app.use(addLogger);

//Configuro Handlebars, motor y enlace
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


// Importo vistas
app.use('/', viewsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/moking', mockingRoutes);
app.use('/api/loggerTest', loggerTestRoutes);
app.use('/api/users', usersRoutes);


// Configurar Socket.IO para manejar conexiones WebSocket
io.on('connection', (socket) => {
  logger.info('Cliente conectado a través de WebSocket');
  let productIdCounter = 1;
  // Manejar el evento cuando se agrega un producto
  socket.on('productAdded', (product) => {
    product.id = productIdCounter++;
    logger.info('Evento productAdded emitido:', product);
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

      logger.info("Mensaje guardado en MongoDB");

      // Emitir un evento para informar al cliente que el mensaje se guardó con éxito
      io.emit("messageSaved", savedMessage);
    } catch (error) {
      logger.error("Error al guardar el mensaje en MongoDB:", error);

      // Emitir un evento de error al cliente si no se pudo guardar el mensaje
      io.emit("messageError", { error: "No se pudo guardar el mensaje." });
    }
  });
});

// Levanto servidor
server.listen(port, () => {
  logger.info(`Servidor corriendo en http://localhost:${port}`);
});

export default app;

