import mongoose from 'mongoose';

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


export const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);

