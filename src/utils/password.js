import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const generateResetToken = () => {
  // Utiliza la biblioteca 'crypto' para generar un token único
  // Ejemplo usando 'crypto':
  return crypto.randomBytes(20).toString('hex');
};

export const sendResetEmail = async (email, resetToken) => {
  // Implementa lógica para enviar el correo electrónico con el token de restablecimiento
  // Puedes utilizar un servicio de correo electrónico, como 'nodemailer'
  // Ejemplo usando 'nodemailer':
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tucorreo@gmail.com',
      pass: 'tucontrasena',
    },
  });

  const mailOptions = {
    from: 'tucorreo@gmail.com',
    to: email,
    subject: 'Restablecimiento de Contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://tuapp.com/reset-password/${resetToken}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};
