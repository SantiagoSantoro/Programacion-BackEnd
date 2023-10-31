import { ticketsModel } from '../../models/tickets.js';

export default class Tickets {
    constructor() {

    }

    getAll = async () => {
        const tickets = await ticketsModel.find();
        return tickets.map(ticket => ticket.toObject());
    }

    getTicketById = async (ticketId) => {
        try {
            const ticket = await ticketsModel.findById(ticketId);
            if (!ticket) {
                throw new Error('Ticket no encontrado.');
            }
            return ticket.toObject();
        } catch (error) {
            throw error;
        }
    }

    createTicket = async (ticketData) => {
        try {
            const result = await ticketsModel.create(ticketData);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

