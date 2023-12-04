import passport from 'passport';
import { usersModel } from '../dao/models/users.js';
import { logger } from '../utils/logger.js'

export const getAllUsers = async (req, res) => {
  try {
      const allUsers = await usersModel.find();
      res.json(allUsers);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const register = (req, res) => {
    passport.authenticate('register', { failureRedirect: '/failRegister' })(req, res, async () => {
        res.send({ status: 'success', message: 'Usuario registrado' });
    });
};

export const getFailRegister = (req, res) => {
    logger.error('Fallo la estrategia');
    res.send({ error: 'Failed register' });
};

export const changeUserRole = async (req, res) => {
    try {
      const userId = req.params.uid;
  
      // Puedes validar aquí que el usuario existe y realizar otras verificaciones necesarias
  
      const user = await usersModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Cambiar el rol opuesto al actual
      const newRole = user.role === 'user' ? 'premium' : 'user';
  
      await usersModel.findByIdAndUpdate(userId, { role: newRole });
  
      res.json({ message: `Rol de usuario cambiado a ${newRole}` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
