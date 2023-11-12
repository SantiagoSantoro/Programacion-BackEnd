import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
    res.send({ message: 'Prueba de Logger' });
});

export default router;
