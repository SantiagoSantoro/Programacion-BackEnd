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
        if (result.ok) {
            alert('✅ ¡Usuario creado con éxito!');  // 👈 esto se agrega
            window.location.href = '/login';
        } else {
            return result.text().then(errorText => {
                console.error('Error en la solicitud al servidor:', errorText);
                alert('❌ Error al crear el usuario. Intentá de nuevo.'); // 👈 opcional pero útil
            });
        }
    }).catch(error => {
        console.error('Error en la solicitud al servidor:', error);
        alert('❌ Error de conexión. Intentá de nuevo.'); // 👈 opcional pero útil
    });
});