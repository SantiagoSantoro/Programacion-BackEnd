// Función para generar datos simulados de productos
export const generateMockProducts = (count) => {
    const mockProducts = [];
    for (let i = 0; i < count; i++) {
      const product = {
        id: i + 1, // Agregamos un campo 'id'
        title: `Producto ${i + 1}`,
        description: `Descripción del producto ${i + 1}`,
        code: `product${i + 1}`,
        price: Math.floor(Math.random() * 100) + 1,
        status: true,
        stock: Math.floor(Math.random() * 100) + 1,
        category: 'Category',
        thumbnail: 'https://example.com/thumbnail.png',
      };
      mockProducts.push(product);
    }
    return mockProducts;
  };