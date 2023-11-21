import passport from 'passport';
import local from 'passport-local';
import { usersModel } from '../dao/models/users.js';
import { createHash, isValidPassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';
import { logger } from '../utils/logger.js'
import MailingService from '../services/mailing.js'

const mailer = new MailingService();
const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age, password: userPassword } = req.body;
        try {
            const exists = await usersModel.findOne({ email });
            if (exists) {
                logger.warning('El usuario ya existe');
                return done(null, false);
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(userPassword),
                role: req.body.role || 'user',
            };

            const result = await usersModel.create(newUser);

            // Envía un correo electrónico después de la creación exitosa del usuario
            await mailer.sendSimpleMail({
                from: "CoderTest",
                to: "santiagosantoro10@gmail.com",
                subject: 'Bienvenido a nuestro servicio',
                html: '<div><h1>Usuario registrado</h1></div>'
            });

            return done(null, result);
        } catch (error) {
            logger.error('Error al crear el usuario:', error);
            return done('Error al crear el usuario:' + error);
        }
    }));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await usersModel.findOne({ email: username });
    
            logger.info('Usuario encontrado:', user); // Agregado para verificar el usuario encontrado
    
            if (!user) {
                logger.info('Usuario no encontrado');
                return done(null, false, { message: 'Usuario no encontrado' });
            }
    
            const isValid = isValidPassword(user.password, password);
    
            logger.info('Contraseña válida', isValid); // Agregado para verificar si la contraseña es válida
    
            if (!isValid) {
                logger.error('Contraseña incorrecta');
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
    
            logger.info('Inicio de sesión exitoso');
            return done(null, user);
        } catch (error) {
            logger.error('Error durante la autenticación:', error); // Agregado para capturar errores
            return done(error);
        }
    }));
    

    //Estrategia para el logeo de Github

    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.85ade55c4e4fdab5",
        clientSecret: "d8270aa46b711f5f7cb4bb567a7222ee005f124a",
        callbackURL: "http://localhost:8080/api/sessions/githubCallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            logger.info(profile);
            let user = await usersModel.findOne({ userName: profile._json.login });
            if (!user) {
                let newUser = { first_name: profile._json.name, userName: profile._json.login };
                let result = await usersModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));



    passport.serializeUser(async (user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await usersModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });

};





