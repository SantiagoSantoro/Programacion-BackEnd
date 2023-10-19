import Carts from '../dao/managers/mongodb/carts.js';

const cartsManager = new Carts();

export const getAllCarts = async (req, res) => {
  try {
    const carts = await cartsManager.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const data = req.body; // Datos para crear un carrito
    const newCart = await cartsManager.saveCart(data);
    res.json({
      message: 'Carrito creado con éxito',
      cart: newCart
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cartId; // Obtener el ID del carrito desde los parámetros de la solicitud
    const cart = await cartsManager.getCartById(cartId);
    res.json({ message: 'Carrito encontrado con éxito', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    await cartsManager.addProductToCart(cartId, productId, quantity);
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
    await cartsManager.updateProductInCart(cartId, productId, quantity);
    res.json({ message: 'Cantidad del producto actualizada con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//CHEQUEAR PORQUE DICE QUE BORRA LAS CANTIDADES Y CUANDO HACES EL GET AL CARRITO NO SALEN LOS VALORES
export const removeProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId; // Obtener el ID del producto desde los parámetros
    const quantity = req.body.quantity;
    await cartsManager.removeProductFromCart(cartId, productId, quantity);
    res.json({ message: 'Producto eliminado del carrito con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeAllProductsFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    await cartsManager.removeAllProductsFromCart(cartId);
    res.json({ message: 'Todos los productos del carrito eliminados con éxito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
