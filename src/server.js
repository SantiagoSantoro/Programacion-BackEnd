const express = require('express')

const { Server: HttpServer } = require('http')

const { Server: IOServer } = require('socket.io')

const app = express()

const httpServer = new HttpServer(app)

const io = new IOServer(httpServer)

const PORT = process.env.PORT || 4000

app.use(express.static('public'))

app.get('/', (req, res) => {

    res.sendFile('index.html', { root: __dirname })

})

let productos = [

    { id: 1, nombre: 'Producto 1', precio: 100 },

    { id: 2, nombre: 'Producto 2', precio: 200 },

    { id: 3, nombre: 'Producto 3', precio: 300 }

]

io.on('connection', (socket) => {

    // console.log('a user connected')

    const mensaje = {

        mensaje: 'ok',

        productos

    }

    socket.emit('mensaje-servidor', mensaje)

    socket.on('producto-nuevo', (producto, cb) => {

        productos.push(producto)

        const mensaje = {

            mensaje: 'productos insertado',

            productos

        }

        const id = new Date().getTime()

        io.sockets.emit('mensaje-servidor', mensaje )

        cb(id)

    })

})

httpServer.listen(PORT, () => {

    console.log(`Server listening on port ${PORT}`)

})