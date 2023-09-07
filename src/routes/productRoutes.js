import { Router } from "express";
import Products from "../dao/managers/mongodb/products.js";

const router = Router();
const productsManager = new Products();

router.get('/', async (req, res) => {
  const limit = req.query.limit;
  let products = await productsManager.getAll();

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await productsManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    await productsManager.createProduct(newProduct);
    res.status(201).json({ message: 'Producto agregado exitosamente.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedFields = req.body;
  try {
    await productsManager.updateProduct(productId, updatedFields);
    res.json({ message: 'Producto actualizado exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

router.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    await productsManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

export default router;


