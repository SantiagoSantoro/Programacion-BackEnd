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
  finalizePurchase, 
} from '../controllers/cartsController.js'; 
import { isUser } from '../middleware/authorization.js'

const router = Router();
const cartsManager = new Carts();


router.get('/', getAllCarts);
router.post('/', createCart);
router.get('/:cartId', getCartById);
router.post('/:cartId/product/:productId', isUser, addProductToCart);
router.put('/:cartId/product/:productId', isUser, updateProductInCart);
router.delete('/:cartId/product/:productId', isUser, removeProductFromCart);
router.delete('/:cartId', removeAllProductsFromCart);
router.post('/:cartId/finalizePurchase', isUser, finalizePurchase);


export default router;




