const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.productId = 1;
    this.initializeProducts();
  }

  async initializeProducts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.productId = this.calculateNextId();
    } catch (error) {
      // Si el archivo no existe o está vacío, se creará un archivo vacío
      await fs.promises.writeFile(this.path, '[]');
    }
  }

  calculateNextId() {
    if (this.products.length === 0) {
      return 1;
    }
    const lastProduct = this.products[this.products.length - 1];
    return lastProduct.id + 1;
  }

  async saveProductsToFile() {
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
  }

  async addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      throw new Error("Ya existe un producto con el mismo código.");
    }

    product.id = this.productId++;
    this.products.push(product);
    await this.saveProductsToFile();
    console.log("Producto agregado exitosamente.");
  }

  async getProducts() {
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      throw new Error("Producto no encontrado.");
    }
  }

  async updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error("Producto no encontrado.");
    }

    const updatedProduct = { ...this.products[productIndex], ...updatedFields };
    this.products[productIndex] = updatedProduct;
    await this.saveProductsToFile();
    console.log("Producto actualizado exitosamente.");
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error("Producto no encontrado.");
    }

    this.products.splice(productIndex, 1);
    await this.saveProductsToFile();
    console.log("Producto eliminado exitosamente.");
  }
}

// Ejemplo de uso
(async () => {
  const manager = new ProductManager('Products.json');

  console.log(await manager.getProducts());

  await manager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });

  console.log(await manager.getProducts());

  try {
    const product = await manager.getProductById(1);
    console.log("Producto encontrado:", product);
  } catch (error) {
    console.error(error.message);
  }

  try {
    await manager.updateProduct(1, { price: 250, stock: 30 });
  } catch (error) {
    console.error(error.message);
  }
  // Bloque comentado para que en products.json pueda visualizarse el array con el producto, sino se elimina y queda vacío.
  // try {
  //   await manager.deleteProduct(1);
  // } catch (error) {
  //   console.error(error.message);
  // }

  console.log(await manager.getProducts());
})();



