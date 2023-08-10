import express from 'express';
import ProductManager from '../productManager';

const router = express.Router();
const manager = new ProductManager('../products.json');


router.get('/', async (req, res) => {
  const limit = req.query.limit;
  let products = await manager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await manager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    await manager.addProduct(newProduct);
    res.status(201).json({ message: 'Producto agregado exitosamente.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedFields = req.body;
  try {
    await manager.updateProduct(productId, updatedFields);
    res.json({ message: 'Producto actualizado exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

router.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    await manager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

export default router;

