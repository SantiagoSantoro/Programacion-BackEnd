# 🛒 Programacion BackEnd

**Backend completo para un E-commerce** desarrollado con **Node.js, Express y MongoDB**, con vistas dinámicas usando **Handlebars**.

---

## ✨ Características principales

- 🔐 Autenticación de usuarios (login local y con GitHub)
- 🧠 Manejo de sesiones
- 📦 Gestión de productos
- 🛒 Carrito de compras persistente
- 💬 Chat en tiempo real
- 🧾 Finalización de compra y generación de ticket
- 🔁 Recuperación de contraseña
- 🖥️ Vistas renderizadas con Handlebars

---

## 🚀 Tecnologías

- ⚙️ Node.js  
- 🚂 Express  
- 🍃 MongoDB + Mongoose  
- 🎨 Handlebars  
- 🔑 Passport (Local + GitHub)  
- 🗂️ Express-session  
- 🔌 Socket.IO  
- 🍭 SweetAlert2  
- 🌱 dotenv  
- 📝 Winston Logger  

---

## 📦 Instalación

### 1️⃣ Clonar el repositorio

git clone https://github.com/SantiagoSantoro/Programacion-BackEnd.git

2️⃣ Entrar a la carpeta
cd Programacion-BackEnd

3️⃣ Instalar dependencias
npm install

🔐 Variables de entorno
Crear un archivo .env en la raíz del proyecto:
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