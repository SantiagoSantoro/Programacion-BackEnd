import { Router } from "express";
import Carts from "../dao/managers/mongodb/carts.js"; 
import {
  getAllCarts,
  createCart,
  getCartById,
  addProductToCart,
  updateProductInCart,
  removeProductFromCart,
  removeAllProductsFromCart,
} from '../controllers/cartsController.js'; 

const router = Router();
const cartsManager = new Carts();


router.get('/', getAllCarts);
router.post('/', createCart);
router.get('/:cartId', getCartById);
router.post('/:cartId/product/:productId', addProductToCart);
router.put('/:cartId/product/:productId', updateProductInCart);
router.delete('/:cartId/product/:productId', removeProductFromCart);
router.delete('/:cartId', removeAllProductsFromCart);


export default router;




