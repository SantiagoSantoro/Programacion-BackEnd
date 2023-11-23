import { usersModel } from '../dao/models/users.js';
import { generateResetToken, sendResetEmail } from '../utils/password.js';
import { createHash } from '../utils.js'
import MailingService from '../services/mailing.js';

export const renderForgotPassword = (req, res) => {
    res.status(404).json({ error: 'Usuario no encontrado' });
};

export const handleForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await usersModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const resetToken = generateResetToken();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora de duración
        await user.save();

        // Envía el correo electrónico con el enlace de restablecimiento
        MailingService.sendSimpleMail({
            from: "CoderTest",
            to: user.email,
            subject: 'Restablecimiento de Contraseña',
            html: `<div>Haz clic en el siguiente enlace para restablecer tu contraseña: http://tuapp.com/reset-password/${resetToken}</div>`
        });

        res.status(200).json({ message: 'Correo de restablecimiento enviado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const renderResetPassword = async (req, res) => {
    try {
        // Verifica que el token sea válido y no haya expirado
        const user = await usersModel.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token inválido o expirado' });
        }

        res.status(200).json({ message: 'Token válido' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const handleResetPassword = async (req, res) => {
    try {
        const user = await usersModel.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token inválido o expirado' });
        }

        // Verificar que la nueva contraseña no sea igual a la anterior
        if (req.body.newPassword === req.body.oldPassword) {
            return res.status(400).json({ error: 'La nueva contraseña no puede ser la misma que la anterior' });
        }

        // Actualizar la contraseña y limpiar el token de restablecimiento
        user.password = createHash(req.body.newPassword);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Contraseña restablecida con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
