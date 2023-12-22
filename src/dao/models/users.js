import mongoose from 'mongoose';

const usersCollection = 'users';

const usersSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' }, // Referencia al modelo Carts
    role: { type: String }, // Por defecto, los usuarios tienen el rol 'user'
    premiumExpiry: Date, // Fecha de vencimiento de la membresía "Premium"
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    documents: [{
        name: String,
        reference: String
    }], // Nueva propiedad para almacenar documentos
    last_connection: Date // Nueva propiedad para la última conexión
});

export const usersModel = mongoose.model(usersCollection, usersSchema);

