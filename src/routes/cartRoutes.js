import { Router } from "express";
import Carts from "../dao/managers/mongodb/carts.js"; 

const router = Router();
const cartsManager = new Carts();

router.get('/', async (req, res) => {
  try {
    const carts = await cartsManager.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCart = { products: [] };
    await cartsManager.saveCart(newCart);
    res.status(201).json({ message: 'Carrito creado exitosamente.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartsManager.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado.' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid; 
  const quantity = parseInt(req.body.quantity);
  try {
    await cartsManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: 'Carrito o producto no encontrado.' });
  }
});

export default router;




