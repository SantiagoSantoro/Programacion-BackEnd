import Carts from '../dao/managers/mongodb/carts.js';

export const getAllCarts = async (req, res) => {
  try {
    const carts = await Carts.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const data = req.body; // Datos para crear un carrito
    const newCart = await Carts.saveCart(data);
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cartId; // Obtener el ID del carrito desde los parámetros de la solicitud
    const cart = await Carts.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    await Carts.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductInCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    await Carts.updateProductInCart(cartId, productId, quantity);
    res.json({ message: 'Cantidad del producto actualizada con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId; // Obtener el ID del producto desde los parámetros
    await Carts.removeProductFromCart(cartId, productId);
    res.json({ message: 'Producto eliminado del carrito con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeAllProductsFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    await Carts.removeAllProductsFromCart(cartId);
    res.json({ message: 'Todos los productos del carrito eliminados con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
