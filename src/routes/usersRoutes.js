import { Router } from 'express';
import { getAllUsers, register, getFailRegister, changeUserRole } from '../controllers/usersController.js';



const router = Router();

router.get('/getAllUsers', getAllUsers);
router.post('/register', register);
router.get('/failRegister', getFailRegister);

// Ruta para cambiar el rol de un usuario a "premium"
router.post('/premium/:uid', changeUserRole);

export default router;