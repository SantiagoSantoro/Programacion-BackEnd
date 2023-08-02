const ManagerUsuarios = require("./managerUsuarios");

const manager = new ManagerUsuarios();

const crearUsuarios = async () => {
    let consultaUsuarios = await manager.consultarUsuarios();
    console.log(consultaUsuarios);

    let user = {
        nombre: 'Santiago',
        apellido: 'Santoro',
        nombreUsuario: 'user1',
        contrasena: '1234'
    };
    await manager.crearUsuario(user);
    let segundaConsultaUsuarios = await manager.consultarUsuarios();
    console.log(segundaConsultaUsuarios);
    await manager.validarUsuario('user1', '1234'); // correcto
    await manager.validarUsuario('user2', 'asass'); // mal nombre de usuario
    await manager.validarUsuario('user1', '12345'); // mal contraseña
}

crearUsuarios();