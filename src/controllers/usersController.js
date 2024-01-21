import passport from 'passport';
import { usersModel } from '../dao/models/users.js';
import { logger } from '../utils/logger.js';
import MailingService from '../services/mailing.js';
import { cartsModel } from '../dao/models/carts.js';





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



export const register = async (req, res) => {
  try {
    passport.authenticate('register', { failureRedirect: '/failRegister' })(req, res, async () => {
    
      // Verificar si el usuario se creó correctamente
      if (req.user) {
        try {
          // Crear un nuevo carrito
          const newCart = await cartsModel.create({ products: [] });

          // Asignar el ID del carrito al usuario
          req.user.cart = newCart._id;

          // Guardar el usuario en la base de datos con el ID del carrito
          await req.user.save();

          // Imprimir en la consola el ID del carrito
          console.log(`Usuario creado con éxito. ID del carrito: ${req.user.cart}`);

          // Redirigir al usuario a la página de inicio o a la página deseada
          res.redirect('/login');  // Cambia '/login' por la URL a la que deseas redirigir

          // También puedes usar res.send para enviar una respuesta JSON si es necesario
          // res.send({ status: 'success', message: 'Usuario registrado' });
        } catch (error) {
          console.error('Error al asignar el ID del carrito al usuario:', error);
          res.send({ status: 'error', message: 'Error al registrar el usuario' });
        }
      } else {
        // Manejar el caso en que la creación del usuario falla
        console.error('Error al crear el usuario');
        res.send({ status: 'error', message: 'Error al registrar el usuario' });
      }
    });
  } catch (error) {
    console.error(error);
    res.send({ status: 'error', message: 'Error al registrar el usuario' });
  }
};


export const getFailRegister = (req, res) => {
  logger.error('Fallo la estrategia');
  res.send({ error: 'Failed register' });
};

export const changeUserRole = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await usersModel.findById(userId).lean();


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

      const user = await usersModel.findById(userId).lean();

      if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const deletedUser = { user }; // Crear un objeto con los datos necesarios

      // Eliminar el usuario
      await usersModel.findByIdAndDelete(userId);

      // Renderiza la vista de usuario eliminado
      res.render('delete-user', deletedUser);

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
