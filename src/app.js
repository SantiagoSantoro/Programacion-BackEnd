const express = require('express');
const ProductManager = require('./ProductManager');


const app = express();
const manager = new ProductManager('products.json');


// Ruta para obtener todos los productos (opcional: limitar resultados con ?limit=)
app.get('/products', async (req, res) => {
    const limit = req.query.limit; // Obtenemos el valor del query param "limit"
    let products = await manager.getProducts();
  
    // Verificamos si existe el query param "limit"
    if (limit) {
      // Si existe, convertimos el valor a número y limitamos los resultados según el query param
      products = products.slice(0, parseInt(limit));
    }
  
    res.json(products);
});

  
  // Ruta para obtener un producto por su id
  app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
      const product = await manager.getProductById(productId);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  });
  

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
