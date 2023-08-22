import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import  __dirname from './utils.js'; 

const app = express();
const server = http.createServer(app);

// Middleware para permitir el manejo de JSON en las solicitudes
app.use(express.json());

// Crear el motor de plantillas de Express Handlebars
const handlebars = exphbs.create({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
});

// Configurar el motor de plantillas
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página principal!');
});

// Usar las rutas de productos bajo /api/products
app.use('/api/products', productRoutes);

// Usar las rutas de carritos bajo /api/carts
app.use('/api/carts', cartRoutes);

const io = new Server(server);


// Configurar Socket.IO para manejar conexiones WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado a través de WebSocket');

  // Manejar el evento cuando se agrega un producto
  socket.on('productAdded', (product) => {
    console.log('Evento productAdded emitido:', product);
    io.emit('updateProducts', product);
  });
  

  // Manejar el evento cuando se elimina un producto
  socket.on('productRemoved', (productId) => {
    // Emitir el evento a todos los clientes conectados
    io.emit('updateProducts', { removedProductId: productId });
  });
});

// Ruta para la vista "home"
app.get('/home', (req, res) => {
  res.render('home');
});

// Ruta para la vista en tiempo real de productos
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

const port = 8080;
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
