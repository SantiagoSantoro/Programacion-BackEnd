import { promises as fs } from 'fs';

class CartManager {
  constructor(filePath) {
    this.path = filePath;
    this.carts = [];
    this.initializeCarts();
  }

  async initializeCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o está vacío, se crea un arreglo vacío
      await fs.writeFile(this.path, '[]');
    }
  }

  async saveCartsToFile() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }

  async getCartById(cartId) {
    return this.carts.find(cart => cart.id === cartId);
  }

  async addCart(newCart) {
    this.carts.push(newCart);
    await this.saveCartsToFile();
  }

  async addProductToCart(cartId, productId, quantity) {
    const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
    if (cartIndex != -1) {
      const existingProduct = this.carts[cartIndex].products.findIndex(product => product.product === productId);
      if (existingProduct != -1) {
        this.carts[cartIndex].products[existingProduct].quantity += quantity;
      } else {
        this.carts[cartIndex].products.push({ product: productId, quantity });
      }
      await this.saveCartsToFile();
    } else {
      throw new Error('Carrito no encontrado.');
    }
  }

  // Generar un ID único para el carrito 
  generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }
}

export default CartManager;


