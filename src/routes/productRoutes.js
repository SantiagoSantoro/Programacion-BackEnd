import { Router } from "express";
import Products from "../dao/managers/mongodb/products.js";
import { uploader } from "../utils.js";
import {
  getPaginatedProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByAvailability,
  saveProduct
} from '../controllers/productsController.js';


const router = Router();
const productsManager = new Products();

// Ruta para obtener productos paginados y todos los productos
router.get('/', getPaginatedProducts, getAllProducts);

// Ruta para obtener un producto por ID
router.get('/:pid', getProductById)

// Ruta para agregar un nuevo producto con foto
router.post('/', uploader.single('thumbnail'), saveProduct);

// Ruta para actualizar un producto
router.put('/:pid', updateProduct)

// Ruta para eliminar un producto
router.delete('/:pid', deleteProduct)

// Ruta para buscar productos por categoría
router.get('/category/:category', getProductsByCategory);

// Ruta para buscar productos por disponibilidad
router.get('/availability/:availability', getProductsByAvailability);




export default router;


