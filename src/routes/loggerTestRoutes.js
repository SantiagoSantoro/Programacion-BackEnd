import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
    req.logger.warning('Alerta');
    req.logger.debug('Debugging');
    req.logger.http('Información');
    req.logger.error('Error crítico');
    req.logger.fatal('Error fatal');  
    res.send({ message: 'Prueba de Logger' });
});

  

export default router;

