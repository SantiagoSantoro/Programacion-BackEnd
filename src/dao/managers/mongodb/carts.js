import { productsModel } from '../../models/products.js';
import { cartsModel } from '../../models/carts.js';

export default class Carts {
    constructor() {
    }

    getAll = async () => {
        const carts = await cartsModel.find()
        return carts.map(cart => cart.toObject());
    }

    saveCart = async (cart) => {
        try {
            const result = await cartsModel.create(cart);
            return result;
        } catch (error) {
            return error;
        }
    }

    addProductToCart = async (idCart, idProduct) => {
        try {
            const product = await productsModel.findOne({ _id: idProduct });
            const cart = await cartsModel.findOne({ _id: idCart });

            cart.products.push({
                product: product.id,
                quantity: 1 
            });

            await cartsModel.updateOne({ _id: idCart }, cart);
            return;
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            throw new Error("No se pudo agregar el producto al carrito");
        }
    }

}