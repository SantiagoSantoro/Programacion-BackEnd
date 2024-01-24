import { cartsModel } from '../../models/carts.js';
import { productsModel } from '../../models/products.js';
import { generateUniqueTicketCode } from '../../../utils/generateUniqueTicketCode.js';
import { ticketsModel } from '../../models/tickets.js'


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
      const cart = await cartsModel.findById(cartId).populate('products.product');
      const myCart = { products: [] };
      if (cart) {
        cart.products.forEach(product => {
          product.totalPrice = product.quantity * product.product.price;
          const myProduct = {
            _id: product.product._id,
            price: product.product.price,
            quantity: product.quantity,
            title: product.product.title,
            totalPrice: product.totalPrice
          };
          myCart.products.push(myProduct)
        });
      }
      return myCart ? myCart : null;
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

      // Validar la cantidad
      if (quantity <= 0) {
        throw new Error('INVALID_QUANTITY');
      }

      // Verificar si el producto ya está en el carrito
      const existingProduct = cart.products.find(item => item.product.equals(productId));

      if (existingProduct) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        existingProduct.quantity += quantity;
      } else {
        // Si el producto no está en el carrito, agregarlo
        cart.products.push({
          product: product._id,
          quantity: quantity
        });
      }

      await cart.save();
      return;
    } catch (error) {
      throw error;
    }
  };


  updateProductInCart = async (cartId, productId, quantity) => {
    try {
      // Busca el carrito por su ID
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }
      // Busca el producto en el carrito por su ID y actualiza la cantidad
      const productIndex = cart.products.findIndex(product => product.product == productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
      } else {
        throw new Error('INVALID_PRODUCT_ID');
      }
      return;
    } catch (error) {
      throw error;
    }
  };

  removeProductFromCart = async (cartId, productId) => {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }
  
      // Filtra los productos y excluye el que coincide con el productId
      cart.products = cart.products.filter(product => product.product != productId);
      
      await cart.save();
  
      return;
    } catch (error) {
      throw error;
    }
  };
  

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

      for (const item of cart.products) {
        const productId = item.product;
        const { price } = await productsModel.findById(productId); // Utiliza la función para obtener el precio del producto

        totalAmount += price * item.quantity;
      }

      return totalAmount;
    } catch (error) {
      throw error;
    }
  }

  finalizePurchase = async (cartId, user) => {
    const cart = await cartsModel.findById(cartId);
    // Verificar el stock de los productos en el carrito y realizar otras operaciones necesarias.
    for (const item of cart.products) {
      const productId = item.product;
      const product = await productsModel.findById(productId);
      if (product.stock < item.quantity) {
        throw new Error(`No hay suficiente stock para el producto: ${product.name}`);
      }
    }
    // Crear un ticket con los datos de la compra utilizando la función importada
    const ticketData = {
      code: generateUniqueTicketCode(),
      purchase_datetime: new Date(),
      amount: await this.calculateTotalAmount(cart), // Utiliza "await" para obtener el resultado
      purchaser: user.email,
    };

    const ticket = await ticketsModel.create(ticketData);

    return ticket;

  };

}
