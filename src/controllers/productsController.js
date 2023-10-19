import Products from '../dao/managers/mongodb/products';

//Chequear que las funciones se llamen igual a los de los mannagers

const productsManager = new Products()

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsManager.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await productsManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const products = await productsManager.getByCategory(category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByAvailability = async (req, res) => {
  const availability = req.params.availability;

  try {
    const products = await productsManager.getByAvailability(availability);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveProduct = async (req, res) => {
  const product = req.body;
  const photoRoute = req.file.path; // Asumiendo que usas multer para subir fotos

  try {
    const result = await productsManager.saveProduct(product, photoRoute);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await productsManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedFields = req.body;

  try {
    await productsManager.updateProduct(productId, updatedFields);
    res.json({ message: 'Producto actualizado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
