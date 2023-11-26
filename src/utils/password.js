import crypto from 'crypto';


export const generateResetToken = () => {
  // Utiliza la biblioteca 'crypto' para generar un token único
  // Ejemplo usando 'crypto':
  return crypto.randomBytes(20).toString('hex');
};

