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
// instalar express y nodemon en cada carpeta, porque no se instala globalmente. npm i express - npm i nodemon.

/* Entrega nro. 3:
Servidor con Express.
Recordemos:
Tomamos la clase productManager la cual tenia persistencia en memoria.
Desarrollamos un productManager basado en archivos con métodos asincrónicos.
Conseguimos cambiar la persistencia de memoria de archivos.
Desafío entregable: Servidor con Express.
Consigna: Desarrollar un servidor basado en Express donde podamos hacer consultas a nuestro archivo de productos.
Aspectos a incluir:
Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.
Desarrollar un servidor express que, en su archivo app.js importe el archivo de ProductManager que actualmente tenemos.
El servidor debe contar con los siguientes endpoints:
- ruta '/products', la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir
por query param el valor ?limit= el cual recibirá un límite de resultados.
- sino se recibe query de límite, se devolverán todos los productos.
- si se recibe un límite, solo devolver el número de productos solicitados.
- ruta '/products/:pid' la cual debe recibir por req.params el pid (product Id), y devolver solo el producto solicitado, en lugar de 
todos los productos.
Sugerencias: 
Tu clase lee archivos con promesas. Recuerda usar async/await en tus endpoints.
Utiliza un archivo que ya tenga productos, pues el desafío solo es para gets.
Formato del entregable:
Link al repositorio de Github con el proyecto completo, el cual debe incluir:
- carpeta src con app.js dentro y tu ProductManager dentro.
- package.JSON con la info del proyecto.
- NO incluir los node modules generados.

PROCESO DE TESTING

Servidores con express

Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.

Se instalarán las dependencias a partir del comando npm install
Se echará a andar el servidor
Se revisará que el archivo YA CUENTE CON AL MENOS DIEZ PRODUCTOS CREADOS al momento de su entrega, es importante para que los tutores no tengan que crear los productos por sí mismos, y así agilizar el proceso de tu evaluación.
Se corroborará que el servidor esté corriendo en el puerto 8080.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.
*/