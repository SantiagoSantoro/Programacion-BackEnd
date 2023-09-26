import { Router } from "express";
import Products from "../dao/managers/mongodb/products.js";
import Carts from "../dao/managers/mongodb/carts.js";
import Messages from "../dao/managers/mongodb/messages.js";

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
router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartsManager.getCartById(cartId);
        
        // Calcular el precio total en el controlador
        const totalPrice = cart.products.reduce((total, product) => {
            return total + (product.product.price * product.quantity);
        }, 0);
        
        res.render('cart', { cart, totalPrice });
    } catch (error) {
        console.error('Error:', error);
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


export default router;


