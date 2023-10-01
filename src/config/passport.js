import passport from 'passport';
import local from 'passport-local';
import { usersModel } from '../dao/models/users.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age, password } = req.body;
        try {
            const exists = await usersModel.findOne({ email });
            if (exists) {
                console.log('El usuario ya existe')
                return done(null, false);
            }
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            };
            let result = await userService.create(newUser); //ver si no es usersModel acá
            return done(null, result)
        } catch (error) {
            return done('Error al crear el usuario:' + error)
        }
    }));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {

            const user = await usersModel.findOne({ email: username });

            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            const isValidPassword = await user.isValidPassword(password);

            if (!isValidPassword) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }            

            return done(null, user);
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





