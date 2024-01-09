const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(result => {
        // Verificar si la respuesta es exitosa (código de estado 200)
        if (result.ok) {
            // Redirigir a la página de inicio de sesión
            window.location.href = '/login';
        } else {
            // Manejar otros casos, como errores de validación, etc.
            return result.text().then(errorText => {
                console.error('Error en la solicitud al servidor:', errorText);
            });
        }
    }).catch(error => {
        console.error('Error en la solicitud al servidor:', error);
    });
});

