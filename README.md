# 🛒 Programacion BackEnd

Este es un proyecto de **backend para un e-commerce** completo con **Node.js, Express y MongoDB**, donde también hay vistas dinámicas con **Handlebars**.

El proyecto incluye:
- Autenticación de usuarios (incluyendo login con GitHub)
- Manejo de sesiones
- Gestión de productos
- Carrito de compras persistente
- Chat en tiempo real
- Finalizar compra y generar ticket
- Recuperación de contraseña
- Interfaces con vistas renderizadas (Handlebars)

---

## 🚀 Tecnologías

Este proyecto fue construido con:

- **Node.js**
- **Express**
- **MongoDB** (Mongoose)
- **Handlebars** (vistas)
- **Passport** (autenticación local + GitHub)
- **Sessions**
- **dotenv**
- **SweetAlert2**
- **Socket.IO**
- **Logger personalizado**

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/SantiagoSantoro/Programacion-BackEnd.git
Entrar a la carpeta del proyecto:

bash
Copiar código
cd Programacion-BackEnd
Instalar las dependencias:

bash
Copiar código
npm install
🔐 Variables de entorno
Antes de ejecutar el proyecto necesitás un archivo .env con estas variables:

env
Copiar código
PORT=8080
MONGO_URL=tu_url_de_mongodb
SESSION_SECRET=tu_secret
GITHUB_CLIENT_ID=tu_github_id
GITHUB_CLIENT_SECRET=tu_github_secret
💡 Importante: este archivo no se sube al repositorio por seguridad.

▶️ Cómo ejecutar
Para levantar el proyecto en modo desarrollo:

bash
Copiar código
npm start
Luego abrí en tu navegador:

arduino
Copiar código
http://localhost:8080
🧠 Uso
Login y registro de usuarios

Login con GitHub

Listar productos

Agregar productos al carrito

Ver carrito de compras

Eliminar productos del carrito

Finalizar compra

Chat en tiempo real

Recuperar contraseña por email

🧪 Pruebas
Usá Postman o Insomnia para probar los endpoints de la API.

📚 Estructura principal
Dentro del proyecto vas a encontrar:

arduino
Copiar código
src/
├─ controllers/
├─ routes/
├─ views/
├─ public/
├─ dao/
├─ config/
└─ utils/
🧑‍💻 Autor
Santiago Santoro
Desarrollador Fullstack con experiencia en Node.js, Express, MongoDB y JavaScript.

yaml
Copiar código
