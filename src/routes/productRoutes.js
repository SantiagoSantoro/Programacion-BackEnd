import { Router } from "express";
import Products from "../dao/managers/mongodb/products.js";
import { uploader } from "../utils/utils.js";
import {
  getPaginatedProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByAvailability,
  saveProduct,
  getProductPrice,
} from '../controllers/productsController.js';
import { isAdmin } from '../middleware/authorization.js'


const router = Router();
const productsManager = new Products();

// Ruta para obtener productos paginados y todos los productos
router.get('/', getPaginatedProducts, getAllProducts);

// Ruta para obtener un producto por ID
router.get('/:pid', getProductById)

// Ruta para agregar un nuevo producto con foto
router.post('/', isAdmin, uploader.single('thumbnail'), saveProduct);

// Ruta para actualizar un producto
router.put('/:pid', isAdmin, updateProduct)

// Ruta para eliminar un producto
router.delete('/:pid', isAdmin, deleteProduct)

// Ruta para buscar productos por categoría
router.get('/category/:category', getProductsByCategory);

// Ruta para buscar productos por disponibilidad
router.get('/availability/:availability', getProductsByAvailability);

// Ruta para obtener el precio de un producto por su ID
router.get('/:pid/price', getProductPrice);






export default router;


