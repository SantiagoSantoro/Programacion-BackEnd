import Carts from '../dao/managers/mongodb/carts.js';
import { errorDictionary, handleError } from '../test/errorHandler.js';


const cartsManager = new Carts();


export const getAllCarts = async (req, res) => {
  try {
    const carts = await cartsManager.getAll();
    res.json(carts);
  } catch (error) {
    const errorMessage = handleError(error.message);
    if (error.message === 'CARTS_NOT_FOUND') {
      res.status(404).json({ error: errorMessage });
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
};

export const createCart = async (req, res) => {
  try {
    const data = req.body; // Datos para crear un carrito
    if (!data || !data.userId) {
      throw new Error('INVALID_CART_DATA');
    }
    const newCart = await cartsManager.saveCart(data);
    res.json({
      message: 'Carrito creado con éxito',
      cart: newCart
    });
  } catch (error) {
    const errorMessage = handleError(error.message);
    if (error.message === 'INVALID_CART_DATA') {
      res.status(400).json({ error: errorMessage })
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
};

export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await cartsManager.getCartById(cartId);
    if (!cart) {
      throw new Error('INVALID_CART_ID');
    }
    res.json({ message: 'Carrito encontrado con éxito', cart });
  } catch (error) {
    const errorMessage = handleError(error.message);
    if (error.message === 'INVALID_CART_ID') {
      res.status(400).json({ error: errorMessage });
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
};





export const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cartId; //CHEQUEAR QUE AGREGA CUALQUIER ID RANDOM AL CARRITO Y NO UNO ESPECIFICO
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

export const removeProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.productId; // Obtener el ID del producto desde el body
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

export const finalizePurchase = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const user = req.session.user; // Obtén el usuario de la sesión
    const updatedCartData = await cartsManager.finalizePurchase(cartId, user); // Pasa el usuario como argumento
    res.json({ message: 'Compra finalizada con éxito', updatedCartData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


