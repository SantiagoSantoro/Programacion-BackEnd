import { Router } from "express";
import Products from "../dao/managers/mongodb/products.js";
import { uploader } from "../utils.js";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByAvailability,
  saveProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productsController';


const router = Router();
const productsManager = new Products();

// Rutas relacionadas con productos
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/products/category/:category', getProductsByCategory);
router.get('/products/availability/:availability', getProductsByAvailability);
router.post('/products', upload.single('photo'), saveProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);


// router.get('/', async (req, res) => {
//   try {
//     // Parseo los parámetros de consulta o establecemos valores predeterminados
//     const limit = parseInt(req.query.limit) || 10; // Valor predeterminado para limit
//     const page = parseInt(req.query.page) || 1; // Valor predeterminado para page
//     const query = req.query.query || ''; // Valor predeterminado para query
//     const sort = req.query.sort || ''; // Valor predeterminado para sort

//     // Obtengo todos los productos
//     const products = await productsManager.getAll();

//     // Calculo los índices para paginación
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     // Realizo la paginación de los productos
//     const paginatedProducts = products.slice(startIndex, endIndex);

//     // Realizo el ordenamiento si se proporciona el parámetro sort
//     if (sort === 'asc') {
//       paginatedProducts.sort((a, b) => a.price - b.price);
//     } else if (sort === 'desc') {
//       paginatedProducts.sort((a, b) => b.price - a.price);
//     }

//     // Realizo el filtrado si se proporciona el parámetro query
//     const filteredProducts = query
//       ? paginatedProducts.filter(product => product.title.includes(query))
//       : paginatedProducts;

//     // Calculo el número total de páginas
//     const totalPages = Math.ceil(filteredProducts.length / limit);

//     // Construyo la respuesta con la información solicitada
//     const response = {
//       status: 'success',
//       payload: filteredProducts,
//       totalPages,
//       prevPage: page > 1 ? page - 1 : null,
//       nextPage: page < totalPages ? page + 1 : null,
//       page,
//       hasPrevPage: page > 1,
//       hasNextPage: page < totalPages,
//       prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}&query=${query}&sort=${sort}` : null,
//       nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}&query=${query}&sort=${sort}` : null,
//     };

//     // Envío la respuesta como JSON
//     res.json(response);
//   } catch (error) {
//     // En caso de error, respondo con un mensaje de error
//     res.status(500).json({ error: 'Hubo un error al obtener los productos.' });
//   }
// });


// router.get('/:pid', async (req, res) => {
//   const productId = req.params.pid;
//   try {
//     const product = await productsManager.getProductById(productId);
//     res.json(product);
//   } catch (error) {
//     res.status(404).json({ error: 'Producto no encontrado.' });
//   }
// });

// router.post('/', uploader.single('thumbnail'), async (req, res) => {
//   try {
//     console.log(req.file); // Muestra la información del archivo cargado
//     const newProduct = req.body;
//     console.log(newProduct); // Muestra los datos del producto recibidos en el cuerpo de la solicitud
//     const result = await productsManager.saveProducts(newProduct);
//     res.status(201).json({ message: 'Producto agregado exitosamente.' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.put('/:pid', async (req, res) => {
//   const productId = req.params.pid; 
//   const updatedFields = req.body;
//   try {
//     await productsManager.updateProduct(productId, updatedFields);
//     res.json({ message: 'Producto actualizado exitosamente.' });
//   } catch (error) {
//     res.status(404).json({ error: 'Producto no encontrado.' });
//   }
// });

// router.delete('/:pid', async (req, res) => {
//   const productId = req.params.pid; 
//   try {
//     await productsManager.deleteProduct(productId);
//     res.json({ message: 'Producto eliminado exitosamente.' });
//   } catch (error) {
//     res.status(404).json({ error: 'Producto no encontrado.' });
//   }
// });

// // Ruta para buscar productos por categoría
// router.get('/category/:category', async (req, res) => {
//   try {
//     const category = req.params.category; // Obtenemos la categoría de los parámetros de la URL
//     // Lógica para buscar productos por categoría en la base de datos
//     const productsByCategory = await productsManager.getByCategory(category);

//     // Construimos la respuesta JSON
//     const response = {
//       status: 'success',
//       payload: productsByCategory,
//     };

//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: 'Hubo un error al buscar productos por categoría.' });
//   }
// });

// // Ruta para buscar productos por disponibilidad
// router.get('/availability/:availability', async (req, res) => {
//   try {
//     const availability = req.params.availability; // Obtenemos la disponibilidad de los parámetros de la URL

//     // Lógica para buscar productos por disponibilidad en la base de datos
//     const productsByAvailability = await productsManager.getByAvailability(availability);

//     // Construimos la respuesta JSON
//     const response = {
//       status: 'success',
//       payload: productsByAvailability,
//     };

//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: 'Hubo un error al buscar productos por disponibilidad.' });
//   }
// });




export default router;


