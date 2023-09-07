import mongoose from 'mongoose';

// Define el schema para la colección "carts"
const cartsCollection = "Carts";

const cartsSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  products: [
    {
      product: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Creo y exporto el modelo para la colección "carts"
export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
