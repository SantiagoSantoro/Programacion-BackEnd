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
    // Utiliza "populate" para cargar los detalles de los productos en el carrito
    const cart = await cartsModel.findById(cartId).populate('products.product');
    if (!cart) {
      throw new Error('Carrito no encontrado.');
    }
    res.json(cart.toObject());
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

// Actualizar la cantidad de un producto en el carrito
router.put('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = parseInt(req.body.quantity);

  try {
    await cartsManager.updateProductInCart(cartId, productId, quantity);
    res.json({ message: 'Cantidad de producto en el carrito actualizada exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: 'Carrito o producto no encontrado.' });
  }
});

// Eliminar un producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    await cartsManager.removeProductFromCart(cartId, productId);
    res.json({ message: 'Producto eliminado del carrito exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: 'Carrito o producto no encontrado.' });
  }
});

// Eliminar todos los productos de un carrito
router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    await cartsManager.removeAllProductsFromCart(cartId);
    res.json({ message: 'Todos los productos del carrito han sido eliminados exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado.' });
  }
});




export default router;




