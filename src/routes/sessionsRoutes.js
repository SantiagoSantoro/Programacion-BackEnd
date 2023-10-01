import { Router } from 'express';
import { usersModel } from '../dao/models/users.js';
import { createHash } from '../utils.js'; // Importa la función createHash desde tu archivo de utilidades

const router = Router();

// Ruta para mostrar las sessions

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usersModel.findOne({ email });

        if (!user) {
            return res.status(401).send({ status: "error", error: "Credenciales incorrectas" });
        }

        const isPasswordValid = bcryptjs.compareSync(userPasswordHash, password);

        if (!isPasswordValid) {
            return res.status(401).send({ status: "error", error: "Credenciales incorrectas" });
        }

        // Verifica si el correo electrónico contiene "adminCoder@coder.com" para asignar el rol de administrador
        if (user.email.includes('adminCoder@coder.com')) {
            user.role = 'admin'; // Asigna el rol de administrador al usuario
        }

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role || 'user' // Asigna el rol del usuario o 'user' si no se asigna un rol
        };

        res.send({ status: "success", payload: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
});



router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await usersModel.findOne({ email });
    if (exists) {
        return res.status(400).send({ status: "error", error: "Ya existe un usuario con ese email" });
    }


    const user = {
        first_name, 
        last_name, 
        email, 
        age, 
        password: createHash(password) // Asigna la contraseña hasheada
    };

    try {
        const result = await usersModel.create(user);
        res.send({ status: "success", message: "Usuario registrado" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
});





export default router;