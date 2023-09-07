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
      const cart = await cartsModel.findById(cartId);
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
}
