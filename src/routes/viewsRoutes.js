import { Router } from "express";
import Products from "../dao/managers/mongodb/products.js";
import Carts from "../dao/managers/mongodb/carts.js";
import Messages from "../dao/managers/mongodb/messages.js";

const router = Router();
const productsManager = new Products();
const cartsManager = new Carts();
const messagesManager = new Messages();

// Ruta para la vista "Products"

router.get('/products'), async (req, res) => {
    const products = await productsManager.getAll();
    res.render('products', { products });
};

// Ruta para la vista "Carts"

router.get('/carts', async (req, res) => {
    const carts = await cartsManager.getAll();
    res.render('carts', { carts });
});

// Ruta para la vista "home"

router.get('/home', async (req, res) => {
    const products = await productsManager.getAll();
    res.render('home', { products });
});

// // Ruta para la vista en tiempo real de productos

router.get('/realtimeproducts', async (req, res) => {
    const products = await productsManager.getAll();
    res.render('realtimeproducts', { products });
});

// Ruta para mostrar la vista de chat
router.get('/chat', async (req, res) => {
    const messages = await messagesManager.getAllMessages();
    res.render('chat', { messages });
});



export default router;


