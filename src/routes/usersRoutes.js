import { Router } from 'express';
import { getAllUsers, register, getFailRegister, changeUserRole, uploadDocuments, deleteInactiveUsers, deleteUser } from '../controllers/usersController.js';
import { uploader } from '../utils.js'
import { isLogin, isAdmin } from '../middleware/authorization.js'


const router = Router();

router.get('/getAllUsers', getAllUsers);
router.post('/register', register);
router.get('/failRegister', getFailRegister);
router.delete('/deleteInactiveUsers', deleteInactiveUsers);
// Ruta para cambiar el rol de un usuario a "premium"
router.post('/premium/:uid', changeUserRole);
// Ruta para procesar el cambio de rol (POST)
router.post('/modify-role', isLogin, isAdmin, changeUserRole);
// Nueva ruta para borrar un usuario
router.post('/delete-user', isLogin, isAdmin, deleteUser);


// Ruta para subir documentos
router.post('/:uid/documents', uploader.single('document'), uploadDocuments);


export default router;