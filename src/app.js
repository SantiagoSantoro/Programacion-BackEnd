import express from 'express';
import productRoutes from './routes/productRoutes.js'; // Importar las rutas de productos
import cartRoutes from './routes/cartRoutes.js'; // Importar las rutas de carritos

const app = express();

// Middleware para permitir el manejo de JSON en las solicitudes
app.use(express.json());

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página principal!');
});

// Usar las rutas de productos bajo /api/products
app.use('/api/products', productRoutes);

// Usar las rutas de carritos bajo /api/carts
app.use('/api/carts', cartRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
