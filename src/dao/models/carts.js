import mongoose from 'mongoose';

// Define el schema para la colección "carts"
const cartsCollection = "Carts";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products', 
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});


// Creo y exporto el modelo para la colección "carts"
export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
