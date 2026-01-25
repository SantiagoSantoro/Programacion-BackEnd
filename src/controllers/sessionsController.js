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
  passport.authenticate('login', { failureRedirect: '/login?error=1' })(req, res, async () => {
    if (!req.user) {
      return res.redirect('/login?error=1');
    }

    delete req.user.password;
    req.session.user = req.user;

    // 👉 ACÁ ESTÁ LA CLAVE:
    res.redirect('/products');
  });
};


export const getFailLogin = (req, res) => {
  res.redirect('/login?error=1');
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


