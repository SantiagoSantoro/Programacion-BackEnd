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
import { createTicket } from "../controllers/ticketsController.js";
import { isUser, isPremiumUser, isLogin } from '../middleware/authorization.js'


const router = Router();
const cartsManager = new Carts();


router.get('/', getAllCarts);
router.post('/', createCart);
router.get('/:cartId', getCartById);
router.post('/:cartId/product/:productId', isLogin, addProductToCart);
router.put('/:cartId/product/:productId', isLogin, updateProductInCart); 
router.delete('/:cartId/product/:productId', isLogin, removeProductFromCart); 
router.delete('/:cartId', removeAllProductsFromCart);
router.post('/:cartId/finalizePurchase', isLogin, finalizePurchase, createTicket);


export default router;




