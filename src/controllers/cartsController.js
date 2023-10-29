import Carts from '../dao/managers/mongodb/carts.js';
import Tickets from '../dao/managers/mongodb/tickets.js';


const cartsManager = new Carts();
const ticketsManager = new Tickets();

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

export const finalizePurchase = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await cartsManager.getCartById(cartId);

    // Verificar el stock de los productos en el carrito y realizar otras operaciones necesarias.
    // ...

    // Crear un ticket con los datos de la compra
    const ticketData = {
      code: generateUniqueTicketCode(), // Debes implementar una función para generar un código único
      purchase_datetime: new Date(),
      amount: calculateTotalAmount(cart), // Debes implementar una función para calcular el monto total
      purchaser: req.session.user.email, // El correo del usuario asociado al carrito
    };

    // Guardar el ticket en la base de datos
    const ticket = await ticketsManager.saveTicket(ticketData);

    // Actualizar el carrito (puedes eliminar los productos que se compraron)
    await cartsManager.updateCartAfterPurchase(cartId, updatedCartData);

    res.json({ message: 'Compra finalizada con éxito', ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

