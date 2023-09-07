import { productsModel } from '../../models/products.js';


export default class Products {
    constructor() {

    }
    getAll = async () => {
        const products = await productsModel.find()
        return products.map(product => product.toObject());
    }

    saveProducts = async (product, photoRoute) => {
        try {
            product.photo = photoRoute;
            const result = await productsModel.create(product);
            return result;
        } catch (error) {
            throw error;
        }

    }
    

}