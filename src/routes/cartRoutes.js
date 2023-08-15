import express from 'express';
const router = express.Router();
import CartManager from '../cartManager.js';

const cartManager = new CartManager('cart.json'); 

// Ruta Raiz POST /api/carts
router.post('/', async (req, res) => {
  try {
    const newCart = { id: cartManager.generateUniqueId(), products: [] };
    await cartManager.addCart(newCart);
    res.status(201).json({ message: 'Carrito creado exitosamente.', cartId: newCart.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartManager.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado.' });
  }
});

// Ruta POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);
  const quantity = parseInt(req.body.quantity);
  try {
    await cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: 'Carrito o producto no encontrado.' });
  }
});


export default router;


