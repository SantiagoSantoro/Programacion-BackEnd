import { Router } from "express";
import Products from "../dao/managers/mongodb/products.js";
import Carts from "../dao/managers/mongodb/carts.js";
import Messages from "../dao/managers/mongodb/messages.js";
import { logger } from "../utils/logger.js"
import {
  renderForgotPassword,
  handleForgotPassword,
  renderResetPassword,
  handleResetPassword,
} from '../controllers/passwordResetController.js';
import { changeUserRole } from '../controllers/usersController.js';
import { isLogin, isAdmin } from '../middleware/authorization.js';
import { usersModel } from "../dao/models/users.js";


const router = Router();
const productsManager = new Products();
const cartsManager = new Carts();
const messagesManager = new Messages();


// Ruta para la vista "Products"
router.get('/products', async (req, res) => {
    const products = await productsManager.getAll();
    res.render('products', { products });
});


// Ruta para la vista de un carrito específico por ID de carrito
router.get('/carts/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const cart = await cartsManager.getCartById(cartId);

        // Verifica si cart es indefinido o si cart.products no está definido
        if (!cart || !cart.products) {
            res.status(404).json({ error: 'Carrito no encontrado.' });
            return;
        }

        // Calcular el precio total en el controlador
        const totalPrice = cart.products.reduce((total, product) => {
            // Verifica si product.product está definido y si product.product.price está definido
            if (product.product && product.product.price) {
                return total + (product.product.price * product.quantity);
            } else {
                return total;
            }
        }, 0);

        res.render('cart', { cart, totalPrice });
    } catch (error) {
        logger.error('Error:', error);
        res.status(404).json({ error: 'Carrito no encontrado.' });
    }
});


// Ruta para la vista "Home"

router.get('/home', async (req, res) => {
    const products = await productsManager.getAll();
    res.render('home', { products });
});

// Ruta para la vista en tiempo real de productos

router.get('/realtimeproducts', async (req, res) => {
    const products = await productsManager.getAll();
    res.render('realtimeproducts', { products });
});

// Ruta para mostrar la vista de chat
router.get('/chat', async (req, res) => {
    const messages = await messagesManager.getAll();
    res.render('chat', { messages });
});

// Ruta para mostrar las sessions

router.get('/login', async (req, res) => {
    res.render('login');
})


router.get('/register', async (req, res) => {
    res.render('register');
})

router.get('/profile', async (req, res) => {
    res.render('profile', {
        user:req.session.user
    })
})

router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.json({ message: 'Sesión cerrada con éxito.' });
});

// Ruta para la vista "Editar Usuarios"
router.get('/edit-users', async (req, res) => {
    try {
      const allUsers = await usersModel.find().lean();
      res.render('edit-users', { allUsers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Ruta para procesar el cambio de rol (POST)
router.post('/modify-role', isLogin, isAdmin, changeUserRole);


router.get('/forgot-password', renderForgotPassword);
router.post('/forgot-password', handleForgotPassword);
router.get('/reset-password/:token', renderResetPassword);
router.post('/reset-password/:token', handleResetPassword);




export default router;


