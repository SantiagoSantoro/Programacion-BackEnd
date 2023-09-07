import mongoose from 'mongoose';

// Define el schema para la colección "products"
const productsCollection = 'Products';

const productsSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: String,
  thumbnail: String,
});

// Creo y exporto el modelo para la colección "products"
export const productsModel = mongoose.model(productsCollection, productsSchema);
