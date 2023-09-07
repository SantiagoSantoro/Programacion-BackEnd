import { Router } from "express";
import Carts from "../dao/managers/mongodb/carts.js"; 

const router = Router();
const cartsManager = new Carts();

router.post('/', async (req, res) => {
  try {
    const newCart = { id: cartsManager.generateUniqueId(), products: [] };
    await cartsManager.createCart(newCart);
    res.status(201).json({ message: 'Carrito creado exitosamente.', cartId: newCart.id });
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
  const productId = parseInt(req.params.pid);
  const quantity = parseInt(req.body.quantity);
  try {
    await cartsManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: 'Carrito o producto no encontrado.' });
  }
});

export default router;



