import Carts from '../dao/managers/mongodb/carts.js';
import { createTicket } from '../controllers/ticketsController.js'; 
import { getProductPrice } from '../controllers/productsController.js'



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

export const calculateTotalAmount = async (cart) => {
  try {
    let totalAmount = 0;

    for (const item of cart.items) {
      const productId = item.product;
      const productPrice = await getProductPrice(productId); // Utiliza la función para obtener el precio del producto
      totalAmount += productPrice * item.quantity;
    }

    return totalAmount;
  } catch (error) {
    throw new Error('Error al calcular el monto total: ' + error.message);
  }
};

export const finalizePurchase = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await cartsManager.getCartById(cartId);

    // Verificar el stock de los productos en el carrito y realizar otras operaciones necesarias.
    for (const item of cart.items) {
      const productId = item.product;
      const product = await getProductById(productId);
      if (product.stock < item.quantity) {
        // No hay suficiente stock para el producto, así que no puedes continuar la compra.
        return res.status(400).json({ error: `No hay suficiente stock para el producto: ${product.name}` });
      }
    }

    // Ahora que has verificado el stock, puedes continuar con la compra.

    // Crear un ticket con los datos de la compra utilizando la función importada
    const ticketData = {
      code: generateUniqueTicketCode(), // Debes implementar una función para generar un código único
      purchase_datetime: new Date(),
      amount: calculateTotalAmount(cart), // Debes implementar una función para calcular el monto total
      purchaser: req.session.user.email, // El correo del usuario asociado al carrito
    };

    // Utilizar la función de creación de tickets
    const ticket = await createTicket(ticketData);

    // Actualizar el carrito (puedes eliminar los productos que se compraron)
    await cartsManager.updateCartAfterPurchase(cartId, updatedCartData); // OJO! CREAR FUNCION

    res.json({ message: 'Compra finalizada con éxito', ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


