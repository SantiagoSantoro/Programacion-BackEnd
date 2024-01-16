import passport from 'passport';
import { logger } from '../utils/logger.js';


export const getHomePage = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'No está autenticado' });
  }
};

export const login = (req, res) => {
  passport.authenticate('login', { failureRedirect: '/failLogin' })(req, res, async () => {
    if (!req.user) {
      return res.status(400).send({ status: 'error', error: 'Credenciales inválidas' });
    }
    delete req.user.password;
    req.session.user = req.user;
    res.send({ status: 'success', payload: req.user });
    console.log(req.user)
  });
};

export const getFailLogin = (req, res) => {
  res.send({ error: 'Failed login' });
};


export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error('Error al destruir la sesión:', err);
    }
    res.redirect('/login');
  });
};

export const getCurrentUser = (req, res) => {
  if (req.isAuthenticated()) {
    const currentUser = req.user;
    res.json({ user: currentUser });
  } else {
    res.status(401).json({ error: 'No está autenticado' });
  }
};

export const loginWithGithub = passport.authenticate('github', { scope: ['user.email'] });

export const githubCallback = (req, res) => {
  passport.authenticate('github', { failureRedirect: '/loginFailed' })(req, res, async () => {
    req.session.user = req.user;
    res.redirect('/products');
  });
};


