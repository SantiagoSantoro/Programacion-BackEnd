const socket = io();
const input = document.getElementById('message');
const form = document.getElementById('chatForm');

form.addEventListener('submit', (evt) => {
    evt.preventDefault(); // Previene el envío del formulario tradicional

    const user = "Santiago"; // Reemplaza con el nombre del usuario real
    const message = input.value;

    // Envía un objeto con los campos 'user' y 'message' al servidor
    socket.emit('message', { user, message });

    input.value = "";
});

// Agrega este código al cliente para escuchar eventos de mensajes guardados en el servidor y actualizar la vista
socket.on('messageSaved', (savedMessage) => {
    console.log('Mensaje guardado en el servidor:', savedMessage);
    // Agrega el mensaje a la vista utilizando JavaScript o Handlebars, por ejemplo:
    const chatList = document.querySelector('#chat ul');
    const li = document.createElement('li');
    li.innerHTML = `<strong>${savedMessage.user}:</strong> ${savedMessage.message}`;
    chatList.appendChild(li);
});


// Agrega este código para escuchar eventos de error de mensajes (opcional)
socket.on('messageError', (error) => {
    console.error('Error al guardar el mensaje en el servidor:', error);
});


