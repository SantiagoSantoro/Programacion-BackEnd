import { Router } from "express";
import Products from "../dao/managers/mongodb/products.js";
import Carts from "../dao/managers/mongodb/carts.js";

const router = Router();
const productsManager = new Products();
const cartsManager = new Carts();

// Ruta para la vista "Products"

router.get('/products'), async(req, res) => {
    const products = await productsManager.getAll();
    res.render('products', {products});
};

// Ruta para la vista "Carts"

router.get('/carts', async(req, res) => {
    const carts = await cartsManager.getAll();
    res.render('carts', {carts});
});

// Ruta para la vista "home"

router.get('/home', async (req, res) => {
    try {
        // Obtener datos de productos desde MongoDB
        const products = await productsManager.getAll();

        // Renderizar la vista 'home' con los datos
        res.render('home', { products });
    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: error.message });
    }
});

// // Ruta para la vista en tiempo real de productos

router.get('/realtimeproducts', async (req, res) => {
    try {
        // Obtener datos de productos desde MongoDB
        const products = await productsManager.getAll();

        // Renderizar la vista 'realtimeproducts' con los datos
        res.render('realtimeproducts', { products });
    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: error.message });
    }
});



export default router;


