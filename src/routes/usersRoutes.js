import { Router } from 'express';
import { getAllUsers, register, getFailRegister, changeUserRole, uploadDocuments } from '../controllers/usersController.js';
import { uploader } from '../utils.js'



const router = Router();

router.get('/getAllUsers', getAllUsers);
router.post('/register', register);
router.get('/failRegister', getFailRegister);

// Ruta para cambiar el rol de un usuario a "premium"
router.post('/premium/:uid', changeUserRole);
// Ruta para subir documentos
router.post('/:uid/documents', uploader.array('document'), uploadDocuments);


export default router;