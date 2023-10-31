import { Router } from 'express';
import { getAllTickets, createTicket, getTicketById } from '../controllers/ticketsController.js'; 

const router = Router();

// Rutas para operaciones de tickets
router.get('/', getAllTickets); // Obtener todos los tickets
router.post('/', createTicket); // Crear un nuevo ticket
router.get('/:id', getTicketById); // Obtener un ticket por ID


export default router;
