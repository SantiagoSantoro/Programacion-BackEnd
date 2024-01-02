import { usersModel } from '../models/usersModel';

export default class Users {
    constructor() {

    }

    getAll = async () => {
        const users = await usersModel.find();
        return users.map(user => user.toObject());
    }
    
    deleteInactiveUsers = async (inactivePeriodInDays = 2) => {
        try {
            // Obtener la fecha actual menos el período de inactividad permitido
            const inactiveThreshold = new Date();
            inactiveThreshold.setDate(inactiveThreshold.getDate() - inactivePeriodInDays);

            // Encontrar y eliminar usuarios inactivos
            const result = await usersModel.deleteMany({ last_connection: { $lt: inactiveThreshold } });

            return result.deletedCount;
        } catch (error) {
            throw new Error(`Error al eliminar usuarios inactivos: ${error.message}`);
        }
    };



}
