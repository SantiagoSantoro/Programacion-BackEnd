import { productsModel } from '../../models/products.js';


export default class Products {
    constructor() {

    }
    getAll = async () => {
        const products = await productsModel.find()
        return products.map(product => product.toObject());
    }
    getProductById = async (productId) => {
        try {
            const product = await productsModel.findById(productId);
            if (!product) {
                throw new Error('Producto no encontrado.');
            }
            return product.toObject();
        } catch (error) {
            throw error;
        }
    }
    getByCategory = async (category) => {
        try {
            const productsByCategory = await productsModel.find({ category });
            return productsByCategory.map(product => product.toObject());
        } catch (error) {
            throw error;
        }
    }

    getByAvailability = async (availability) => {
        try {
          const productsByAvailability = await productsModel.find({ stock: availability });
          return productsByAvailability.map(product => product.toObject());
        } catch (error) {
          throw error;
        }
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
    deleteProduct = async (productId) => {
        try {
            const result = await productsModel.deleteOne({ _id: productId });
            if (result.deletedCount === 0) {
                throw new Error('Producto no encontrado.');
            }
        } catch (error) {
            throw error;
        }
    }
    updateProduct = async (productId, updatedFields) => {
        try {
            const product = await productsModel.findOne({ _id: productId });
            const result = await productsModel.updateOne(
                { _id: productId },
                { $set: updatedFields }
            );
            if (result.nModified === 0) {
                throw new Error('No se realizaron cambios en el producto.');
            }
        } catch (error) {
            throw error;
        }

    }
}