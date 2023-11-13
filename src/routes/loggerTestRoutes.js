import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  req.logger.warn('Alerta');
  req.logger.verbose('Prueba');
  req.logger.debug('Debugging');
  req.logger.info('Información');
  req.logger.error('Error crítico');
  res.send({ message: 'Prueba de Logger' });
});

export default router;

