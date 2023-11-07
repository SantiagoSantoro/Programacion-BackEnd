import { Router } from "express";
import { generateMockProducts } from '../controllers/mockingController.js'

const router = Router();

router.get('/mockingproducts', (req, res) => {
  const mockProducts = generateMockProducts(100); 
  res.json(mockProducts);
});


// Ruta para crear productos simulados mediante una solicitud POST
router.post('/mockingproducts', (req, res) => {
    const count = req.body.count; 
    if (typeof count !== 'number' || count <= 0) {
      return res.status(400).json({ error: 'La cantidad de productos debe ser un número positivo.' });
    }
    const mockProducts = generateMockProducts(count);
    res.json({ message: 'Productos simulados creados con éxito', products: mockProducts });
  });

export default router;
