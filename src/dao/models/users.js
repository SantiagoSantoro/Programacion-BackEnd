import mongoose from 'mongoose';

const usersCollection = 'users';

const usersSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String, 
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' }, // Referencia al modelo Carts
    role: { type: String, default: 'user' } // Por defecto, los usuarios tienen el rol 'user'
});

export const usersModel = mongoose.model(usersCollection, usersSchema);
