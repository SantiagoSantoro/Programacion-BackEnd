import { Router } from 'express';
import { register, getFailRegister, changeUserRole } from '../controllers/usersController.js';



const router = Router();

router.post('/register', register);
router.get('/failRegister', getFailRegister);

// Ruta para cambiar el rol de un usuario a "premium"
router.post('/premium/:uid', changeUserRole);

export default router;