import { Router } from 'express';
import { createHash, isValidPassword } from '../utils.js'; // Importo las funciónes createHash isValidPassword desde mi archivo de utilidades
import passport from 'passport';

const router = Router();

// Ruta para mostrar las sessions

router.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Credenciales invalidas" });
    }
    delete req.user.password
    req.session.user = req.user;
    res.send({ status: "success", payload: req.user })
});

router.get('/failLogin', async (req, res) => {
    res.send({ error: "Failed login" })
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/failRegister' }), async (req, res) => {
    res.send({ status: 'success', message: 'Usuario registrado' })
});

router.get('/failRegister', async (req, res) => {
    console.log('Fallo la estrategia')
    res.send({ error: "Failed register" })
})

// Rutas para Github

router.get('/github', passport.authenticate('github', { scope: ['user.email'] }), async (req, res) => { });
router.get('/githubCallback', passport.authenticate('github', { failureRedirect: '/loginFailed' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/home')
});


export default router;