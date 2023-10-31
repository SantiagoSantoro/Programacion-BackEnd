import Tickets from '../dao/managers/mongodb/tickets.js';

const ticketsManager = new Tickets();

export const getAllTickets = async (req, res) => {
    try {
        const allTickets = await ticketsManager.getAll();
        res.json(allTickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createTicket = async (req, res) => {
    try {
        const newTicket = await ticketsManager.createTicket(req.body); // Utilizo req.body para obtener los datos del ticket
        res.json(newTicket);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el ticket' });
    }
};


export const getTicketById = async (req, res) => {
    const ticketId = req.params.id; // Obtener el ID del ticket desde los parámetros de la solicitud
    try {
        const ticket = await ticketsManager.getTicketById(ticketId);
        res.json(ticket);
    } catch (error) {
        res.status(404).json({ error: 'Ticket no encontrado.' });
    }
};

// Otros controladores relacionados con tickets aquí
