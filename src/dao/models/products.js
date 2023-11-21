import mongoose from 'mongoose';

// Define el schema para la colección "products"
const productsCollection = 'Products';

const productsSchema = mongoose.Schema({
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
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Referencia al modelo Users
  premiumOnly: { type: Boolean, default: false }, // Por defecto, un producto no es exclusivo para usuarios "Premium"
});

// Creo y exporto el modelo para la colección "products"
export const productsModel = mongoose.model(productsCollection, productsSchema);

