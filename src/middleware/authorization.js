// Middleware para verificar si el usuario es un administrador
export const isAdmin = (req, res, next) => {
  const user = req.session.user;
  if (req.user && req.user.role === 'admin') {
    // Si el usuario es un administrador, continúa con la siguiente acción
    return next();
  } else {
    // Si el usuario no es un administrador, devuelve un error o realiza una redirección
    return res.status(403).json({ error: 'Acceso denegado' });
  }
};

// Middleware para verificar si el usuario es un usuario común
export const isUser = (req, res, next) => {
  const user = req.session.user;
  if (req.user && req.user.role === 'user') {
    // Si el usuario es un usuario común, continúa con la siguiente acción
    return next();
  } else {
    // Si el usuario no es un usuario común, devuelve un error o realiza una redirección
    return res.status(403).json({ error: 'Acceso denegado' });
  }
};

// Middleware para verificar si el usuario está autenticado y es premium
export const isPremiumUser = (req, res, next) => {
  const user = req.session.user;
  // Verificar si el usuario está autenticado y si es premium
  if (req.user && req.user.role === 'premium') {
   return next();
  } else {
    return res.status(403).json({ error: 'Acceso no autorizado para usuarios no premium.' });
  }
};






