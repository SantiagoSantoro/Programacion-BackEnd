import { Router } from "express";
import { generateMockProducts } from '../controllers/mockingController.js'

const router = Router();

// Manejador para la solicitud GET
router.get('/mockingproducts', (req, res) => {
  // Aquí deberías llamar a la función que genera los productos simulados y enviar la respuesta
  const mockProducts = generateMockProducts(100); // Supongamos que quieres 100 productos
  res.json(mockProducts);
});

// Manejador para la solicitud POST (si es necesario)
router.post('/mockingproducts', (req, res) => {
  // Si deseas manejar una solicitud POST en este punto, coloca la lógica correspondiente aquí
  // Por ejemplo, para crear productos simulados
  // Luego, envía una respuesta apropiada
  res.json({ message: 'Productos simulados creados' });
});

export default router;
