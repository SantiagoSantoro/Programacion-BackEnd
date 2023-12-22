import passport from 'passport';
import { usersModel } from '../dao/models/users.js';
import { logger } from '../utils/logger.js';
import { uploader } from '../utils.js'

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

export const uploadDocuments = async (req, res) => {
  console.log('Entro a la función uploadDocuments'); // Nuevo console.log
  try {
    const userId = req.params.uid;

    const user = await usersModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const uploadedDocuments = req.files;

    if (!uploadedDocuments || uploadedDocuments.length === 0) {
      return res.status(400).json({ error: 'No se han subido documentos' });
    }
    // Log para verificar el nombre del archivo antes de guardarlo
    console.log('Nombre del archivo:', `${Date.now()}-Tercera entrega.txt`);
    user.documents = uploadedDocuments.map(doc => ({
      name: doc.originalname,
      reference: doc.filename
    }));

    user.last_connection = new Date();

    await user.save();

    res.json({ message: 'Documentos subidos correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

