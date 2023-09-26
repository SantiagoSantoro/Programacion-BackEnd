import mongoose from 'mongoose';

const usersCollection = 'users';

const usersSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String


}) 

export const usersModel = mongoose.model(usersCollection, usersSchema);