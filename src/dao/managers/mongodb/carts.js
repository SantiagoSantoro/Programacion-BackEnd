import { cartsModel } from '../../models/carts.js';

export default class Carts {
  constructor() {}

  getAll = async () => {
    const carts = await cartsModel.find();
    return carts.map(cart => cart.toObject());
  }

  saveCart = async (cart) => {
    try {
      const result = await cartsModel.create(cart);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getCartById = async (cartId) => {
    try {
      const cart = await cartsModel.findById(cartId).populate('products'); //Utilizo método "Populate"
      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }
      return cart.toObject();
    } catch (error) {
      throw error;
    }
  }

  addProductToCart = async (cartId, productId, quantity) => {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }
      
      // Agregar el producto al carrito
      cart.products.push({
        product: productId,
        quantity: quantity
      });

      await cart.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  updateProductInCart = async (cartId, productId, quantity) => {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }
  
      // Busca el producto en el carrito por su ID y actualiza la cantidad
      const productIndex = cart.products.findIndex(product => product.product == productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
      }
  
      return;
    } catch (error) {
      throw error;
    }
  }
  
  removeProductFromCart = async (cartId, productId, quantity) => {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }

  
      // Elimina el producto del carrito por su ID
      cart.products = cart.products.filter(product => product.product != productId);
      await cart.save();
  
      return;
    } catch (error) {
      throw error;
    }
  }
  removeAllProductsFromCart = async (cartId) => {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }
  
      // Elimina todos los productos del carrito
      cart.products = [];
      await cart.save();
  
      return;
    } catch (error) {
      throw error;
    }
  }
  
  
}
