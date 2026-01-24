🛒 Programacion BackEnd

Este es un proyecto de backend para un e-commerce desarrollado con Node.js, Express y MongoDB, que incluye también vistas dinámicas con Handlebars.

El proyecto incluye:

Autenticación de usuarios (incluyendo login con GitHub)

Manejo de sesiones

Gestión de productos

Carrito de compras persistente

Chat en tiempo real

Finalizar compra y generar ticket

Recuperación de contraseña

Interfaces con vistas renderizadas (Handlebars)

🚀 Tecnologías

Este proyecto fue construido con:

Node.js

Express

MongoDB (Mongoose)

Handlebars

Passport (estrategia local + GitHub)

Express-session

Socket.IO

SweetAlert2

dotenv

Logger con Winston

📦 Instalación

Clonar el repositorio:

git clone https://github.com/SantiagoSantoro/Programacion-BackEnd.git


Entrar a la carpeta del proyecto:

cd Programacion-BackEnd


Instalar dependencias:

npm install

🔐 Variables de entorno

Crear un archivo .env en la raíz del proyecto con:

PORT=8080
MONGO_URL=tu_url_de_mongodb
SESSION_SECRET=tu_secret
GITHUB_CLIENT_ID=tu_client_id
GITHUB_CLIENT_SECRET=tu_client_secret


⚠️ Este archivo no se sube al repositorio por razones de seguridad.

▶️ Ejecutar el proyecto
npm start


Luego abrir en el navegador:

http://localhost:8080

🧠 Funcionalidades

Registro y login de usuarios

Login con GitHub

Listado de productos

Agregar productos al carrito

Ver carrito

Eliminar productos del carrito

Finalizar compra y generar ticket

Chat en tiempo real

Recuperación de contraseña

📁 Estructura del proyecto
src/
├── controllers/
├── routes/
├── views/
├── public/
├── dao/
├── config/
└── utils/

🧑‍💻 Autor

Santiago Santoro
Desarrollador Fullstack
