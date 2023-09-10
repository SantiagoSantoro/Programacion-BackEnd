import mongoose from 'mongoose';

// Define el schema para la colección "messages"
const messagesCollection = 'Messages';

const messagesSchema = new mongoose.Schema({
  user: {
    type: String, // Tipo de dato para el usuario (correo del usuario)
    required: true, // El usuario es obligatorio
  },
  message: {
    type: String, // Tipo de dato para el mensaje
    required: true, // El mensaje es obligatorio
  },
  timestamp: {
    type: Date, // Tipo de dato para la marca de tiempo del mensaje
    default: Date.now, // Valor predeterminado: la fecha y hora actual
  },
});

// Creo y exporto el modelo para la colección "messages"
export const messagesModel = mongoose.model(messagesCollection, messagesSchema);


