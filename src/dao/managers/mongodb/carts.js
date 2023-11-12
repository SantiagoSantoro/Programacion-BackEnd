import { cartsModel } from '../../models/carts.js';
import { productsModel } from '../../models/products.js';
import { createTicket, generateUniqueTicketCode } from '../../../controllers/ticketsController.js';
import { getProductPrice } from '../../../controllers/productsController.js'



export default class Carts {
  constructor() { }

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
      const cart = await cartsModel.findById(cartId).populate('products');
      return cart ? cart.toObject() : null;
    } catch (error) {
      throw error;
    }
  }
  

  addProductToCart = async (cartId, productId, quantity) => {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error('INVALID_CART_ID');
      }
  
      const product = await productsModel.findById(productId);
      if (!product) {
        throw new Error('INVALID_PRODUCT_ID');
      }
  
      // Agregar el producto al carrito
      cart.products.push({
        product: product._id,
        quantity: quantity
      });
  
      await cart.save();
      return;
    } catch (error) {
      throw error;
    }
  };
  
  
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

      // Busca el producto en el carrito por su ID y actualiza la cantidad
      const productIndex = cart.products.findIndex(product => product.product == productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity -= quantity; // Usar "-=" para restar la cantidad
        await cart.save();
      }

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

  calculateTotalAmount = async (cart) => {
    try {
      let totalAmount = 0;

      for (const item of cart.items) {
        const productId = item.product;
        const productPrice = await getProductPrice(productId); // Utiliza la función para obtener el precio del producto
        totalAmount += productPrice * item.quantity;
      }

      return totalAmount;
    } catch (error) {
      throw error; // No necesitas envolver el error en otro Error
    }
  }


  finalizePurchase = async (cartId) => {
    const cart = await this.getCartById(cartId);

    // Verificar el stock de los productos en el carrito y realizar otras operaciones necesarias.
    for (const item of cart.items) {
      const productId = item.product;
      const product = await getProductById(productId);
      if (product.stock < item.quantity) {
        throw new Error(`No hay suficiente stock para el producto: ${product.name}`);
      }
    }

    // Ahora que has verificado el stock, puedes continuar con la compra.

    // Crear un ticket con los datos de la compra utilizando la función importada
    const ticketData = {
      code: generateUniqueTicketCode(),
      purchase_datetime: new Date(),
      amount: await calculateTotalAmount(cart), // Utiliza "await" para obtener el resultado
      purchaser: req.session.user.email,
    };

    // Utilizar la función de creación de tickets
    const ticket = await createTicket(ticketData);

    // Actualizar el carrito (puedes eliminar los productos que se compraron)
    // Implementa esta función según tus necesidades

    return updatedCartData; // Devuelve los datos actualizados del carrito
  };



}
