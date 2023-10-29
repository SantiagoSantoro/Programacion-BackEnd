import { Router } from 'express';
import {
  getHomePage,
  login,
  getFailLogin,
  register,
  getFailRegister,
  logout,
  getCurrentUser,
  loginWithGithub,
  githubCallback,
} from '../controllers/sessionsController.js'; 

const router = Router();

// Rutas para mostrar las sessions
router.get('/', getHomePage);
router.post('/login', login);
router.get('/failLogin', getFailLogin);
router.post('/register', register);
router.get('/failRegister', getFailRegister);
router.post('/logout', logout);
router.get('/current', getCurrentUser);

// Rutas para logueo con Github
router.get('/github', loginWithGithub);
router.get('/githubCallback', githubCallback);

export default router;
