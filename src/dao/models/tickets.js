import mongoose from 'mongoose';

// Define el schema para la colección "tickets"
const ticketsCollection = "Tickets";

const ticketsSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

// Creo y exporto el modelo para la colección "tickets"
export const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);

