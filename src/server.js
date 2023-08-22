const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = process.env.PORT || 4000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

let products = [
    { id: 1, title: 'Producto 1', price: 100 },
    { id: 2, title: 'Producto 2', price: 200 },
    { id: 3, title: 'Producto 3', price: 300 }
];

io.on('connection', (socket) => {
    const mensaje = {
        mensaje: 'ok',
        products
    };
    
    socket.emit('mensaje-servidor', mensaje);

    socket.on('producto-nuevo', (producto, cb) => {
        products.push(producto);

        const mensaje = {
            mensaje: 'producto insertado',
            products
        };

        const id = new Date().getTime();

        io.sockets.emit('mensaje-servidor', mensaje);
        cb(id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
