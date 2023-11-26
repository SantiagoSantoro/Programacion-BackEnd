import { usersModel } from '../dao/models/users.js';
import { generateResetToken } from '../utils/password.js';
import { createHash } from '../utils.js';
import MailingService from '../services/mailing.js';




export const renderForgotPassword = (req, res) => {
    // Renderizar la vista con el mensaje de error
    res.render('forgot-password', { error: 'Usuario no encontrado' });
};

export const handleForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await usersModel.findOne({ email });

        if (!user) {
            return res.render('forgot-password', { error: 'Usuario no encontrado' });
        }

        const resetToken = generateResetToken();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora de duración
        await user.save();

        // Envía el correo electrónico con el enlace de restablecimiento
        const mailingService = new MailingService();
        await mailingService.sendSimpleMail({
            from: "CoderTest",
            to: user.email,
            subject: 'Restablecimiento de Contraseña',
            html: `<div>Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:8080/reset-password/${resetToken}</div>`
        });

        // Renderizar la vista con un mensaje de éxito
        res.render('reset-email-sent');
    } catch (error) {
        console.error(error);
        res.render('error-page');
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
            // Renderizar la vista con un mensaje de error si el token no es válido o ha expirado
            return res.render('reset-password-invalid');
        }

        // Renderizar la vista de restablecimiento de contraseña con el token válido
        res.render('reset-password', { token: req.params.token });
    } catch (error) {
        console.error(error);
        // Renderizar la vista de error
        res.render('error-page');
    }
};

export const handleResetPassword = async (req, res) => {
    try {
        const user = await usersModel.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            // Renderizar la vista con un mensaje de error si el token no es válido o ha expirado
            return res.render('reset-password-invalid');
        }

        // Verificar que la nueva contraseña no sea igual a la anterior
        if (req.body.newPassword === req.body.oldPassword) {
            // Renderizar la vista con un mensaje de error si la nueva contraseña es igual a la anterior
            return res.render('reset-password', { token: req.params.token, error: 'La nueva contraseña no puede ser la misma que la anterior' });
        }

        // Actualizar la contraseña y limpiar el token de restablecimiento
        user.password = createHash(req.body.newPassword);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Renderizar la vista de éxito
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        // Renderizar la vista de error
        res.render('error-page');
    }
};

