const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hola Mundo desde un servidor')
});

server.listen(8080,() => {
    console.log('Estamos en linea en el puerto 8080')
})
// instalar express y nodemon en cada carpeta, porque no se instala globalmente. npm i express - npm i nodemon.