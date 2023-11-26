document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const obj = {};
        data.forEach((value, key) => (obj[key] = value));

        try {
            const response = await fetch('/password-reset/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            if (response.status === 200) {
                // El correo de restablecimiento se envió correctamente, podrías redirigir a una página de éxito o mostrar un mensaje.
                console.log('Correo de restablecimiento enviado');
            } else {
                // Manejar errores, podrías mostrar un mensaje de error al usuario.
                console.error('Error al enviar el correo de restablecimiento');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    });
});
