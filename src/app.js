import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import __dirname from './utils.js';

const app = express();
const server = http.createServer(app);

const products = [
  {
    id: 1,
    title: "Producto 1",
    description: "Descripción del producto 1",
    code: "code_1",
    price: 100,
    status: true,
    stock: 50,
    category: "Categoria del producto 1",
    thumbnail: "thumbnail_1",
  },
  {
    id: 2,
    title: "Producto 2",
    description: "Descripción del producto 2",
    code: "code_2",
    price: 101,
    status: true,
    stock: 51,
    category: "Categoria del producto 2",
    thumbnail: "thumbnail_2",
  },
];

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

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página principal!');
});

// Ruta para la vista "home"
app.get('/home', (req, res) => {
  res.render('home', { products: products });
});

// Ruta para la vista en tiempo real de productos
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: products });
});

// Usar las rutas de productos bajo /api/products
app.use('/api/products', productRoutes);

// Usar las rutas de carritos bajo /api/carts
app.use('/api/carts', cartRoutes);

const port = 8080;
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
