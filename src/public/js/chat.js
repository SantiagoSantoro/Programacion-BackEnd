const socket = io();
const input = document.getElementById('message');

input.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        const user = "Santiago"; // Reemplaza con el nombre del usuario real
        const message = input.value;
        
        // Envía un objeto con los campos 'user' y 'message'
        socket.emit('message', { user, message }); 
        
        input.value = "";
    }
});

// Agrega este código para escuchar eventos de mensajes guardados en el servidor (opcional)
socket.on('messageSaved', (savedMessage) => {
    console.log('Mensaje guardado en el servidor:', savedMessage);
});

// Agrega este código para escuchar eventos de error de mensajes (opcional)
socket.on('messageError', (error) => {
    console.error('Error al guardar el mensaje en el servidor:', error);
});

