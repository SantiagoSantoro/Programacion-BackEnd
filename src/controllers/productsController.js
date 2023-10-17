import Products from '../dao/managers/mongodb/products';


export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Products.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Products.getByCategory(category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByAvailability = async (req, res) => {
  const availability = req.params.availability;

  try {
    const products = await Products.getByAvailability(availability);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveProduct = async (req, res) => {
  const product = req.body;
  const photoRoute = req.file.path; // Asumiendo que usas multer para subir fotos

  try {
    const result = await Products.saveProduct(product, photoRoute);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await Products.deleteProduct(productId);
    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedFields = req.body;

  try {
    await Products.updateProduct(productId, updatedFields);
    res.json({ message: 'Producto actualizado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
