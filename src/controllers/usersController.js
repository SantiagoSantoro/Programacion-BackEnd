import passport from 'passport';
import { usersModel } from '../dao/models/users.js';
import { logger } from '../utils/logger.js';
import MailingService from '../services/mailing.js';
import Swal from 'sweetalert2';




export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await usersModel.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteInactiveUsers = async (req, res) => {
  try {
    // Obtener la fecha actual menos 2 días
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    // Encontrar usuarios inactivos
    const inactiveUsers = await usersModel.find({ last_connection: { $lt: twoDaysAgo } });

    // Log para verificar usuarios inactivos
    console.log('Usuarios inactivos:', inactiveUsers);

    // Eliminar usuarios inactivos
    await usersModel.deleteMany({ last_connection: { $lt: twoDaysAgo } });

    // Enviar correos de notificación a los usuarios eliminados
    const mailingService = new MailingService();
    inactiveUsers.forEach(async (user) => {
      await mailingService.sendSimpleMail({
        from: 'CoderTest',
        to: user.email,
        subject: 'Eliminación de cuenta por inactividad',
        text: 'Tu cuenta ha sido eliminada por inactividad en los últimos 2 días.',
      });
    });

    res.json({ message: 'Usuarios inactivos eliminados y notificaciones enviadas correctamente.' });
  } catch (error) {
    console.error('Error en deleteInactiveUsers:', error);
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
    const userId = req.body.userId;

    const user = await usersModel.findById(userId);


    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Obtener el nuevo rol desde el cuerpo de la solicitud
    const newRole = req.body.newRole;

    // Verificar que el nuevo rol sea válido
    if (newRole !== 'user' && newRole !== 'premium' && newRole !== 'admin') {
      return res.status(400).json({ error: 'Rol no válido' });
    }

    await usersModel.findByIdAndUpdate(userId, { role: newRole });

    // Redirige a una nueva vista con un mensaje de éxito
    res.render('roleChanged', { user, newRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.body.userId; // Mismo nombre que el campo HTML

    const user = await usersModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Eliminar el usuario
    await usersModel.findByIdAndDelete(userId);

    // Redirige a la página de lista de usuarios (o a donde desees)
    res.redirect('/edit-users');
  } catch (error) {
    // Manejar errores y enviar una respuesta JSON
    res.status(500).json({ error: error.message });
  }
};


export const uploadDocuments = async (req, res) => {
  try {
    const userId = req.params.uid;

    const user = await usersModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const uploadedDocuments = req.file;

    if (!uploadedDocuments || uploadedDocuments.length === 0) {
      return res.status(400).json({ error: 'No se han subido documentos' });
    }

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
