import { Router } from 'express';
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

// Ruta para cerrar sesión   VERIFICAR PORQUE NO FUNCIONA, TAMPOCO EL PROFILE.HANDLEBARS

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al destruir la sesión:", err);
        }
        res.redirect('/login'); // Redirige al usuario a la página de inicio 
    });
});


// Ruta para verificar la autenticación del usuario actual NO FUNCIONA DESDE EL NAVEGADOR
router.get('/current', (req, res) => {
    console.log(req.user)
    
    
    if (req.isAuthenticated()) {
        
        // Si el usuario está autenticado a través de sessions, obtén el usuario desde req.user
        const currentUser = req.user;
        
        res.json({ user: currentUser });
    } else {
        // Si no está autenticado o estás utilizando JWT, maneja ese caso aquí
        res.status(401).json({ error: 'No está autenticado' });
    }
});


  
// Rutas para logueo con Github

router.get('/github', passport.authenticate('github', { scope: ['user.email'] }), async (req, res) => { });
router.get('/githubCallback', passport.authenticate('github', { failureRedirect: '/loginFailed' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/home')
});




export default router;