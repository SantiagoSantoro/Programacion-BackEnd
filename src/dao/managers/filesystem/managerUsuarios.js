import { logger } from '../utils/logger.js'

const fs = require('fs');
const crypto = require('crypto')
const path = 'Usuarios.json'

class ManagerUsuarios {
    constructor() {

    }
    consultarUsuarios = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            const user = JSON.parse(data);
            return user;
        } else {
            return [];
        }
    }
    crearUsuario = async (usuario) => {
        const users = await this.consultarUsuarios();
        usuario.salt = crypto.randomBytes(128).toString('base64');
        usuario.contrasena = crypto.createHmac('sha256', usuario.salt).update(usuario.contrasena).digest('hex');
        users.push(usuario);
        await fs.promises.writeFile(path, JSON.stringify(users))
    }
    validarUsuario = async (nombreUsuario, contrasena) => {
        const usuarios = await this.consultarUsuarios();
        const usuariosIndex = usuarios.findIndex(user => user.nombreUsuario === nombreUsuario);
        if (usuariosIndex === -1) {
            logger.info('Error: el usuario no se encontro');
            return;
        }
        const usuario = usuarios[usuariosIndex]
        const newHash = crypto.createHmac('sha256', usuario.salt).update(contrasena).digest('hex');
        if (newHash === usuario.contrasena) {
            logger.info('Usuario logueado');
        } else {
            logger.error('Contraseña incorrecta');
        }
    }
}

module.exports = ManagerUsuarios;