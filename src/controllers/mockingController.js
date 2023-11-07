import faker from 'faker';


export const generateMockProducts = (count) => {
  const mockProducts = [];

  for (let i = 0; i < count; i++) {
    const product = {
      id: i + 1,
      title: faker.commerce.productName(), // Utiliza faker para el nombre del producto
      description: faker.lorem.sentence(), // Utiliza faker para la descripción
      code: `producto${i + 1}`,
      price: faker.commerce.price(), // Utiliza faker para el precio
      status: true,
      stock: Math.floor(Math.random() * 100) + 1,
      category: faker.commerce.department(), // Utiliza faker para la categoría
      thumbnail: faker.image.imageUrl(), // Utiliza faker para la URL de la imagen
    };

    mockProducts.push(product);
  }
    return mockProducts;
  };