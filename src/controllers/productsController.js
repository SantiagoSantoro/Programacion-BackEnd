import Products from '../dao/managers/mongodb/products.js';


const productsManager = new Products();

export const getPaginatedProducts = async (req, res) => {
  try {
    // Parseo los parámetros de consulta o establecemos valores predeterminados
    const limit = parseInt(req.query.limit) || 10; // Valor predeterminado para limit
    const page = parseInt(req.query.page) || 1; // Valor predeterminado para page
    const query = req.query.query || ''; // Valor predeterminado para query
    const sort = req.query.sort || ''; // Valor predeterminado para sort

    // Obtengo todos los productos
    const products = await productsManager.getAll();

    // Calculo los índices para paginación
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Realizo la paginación de los productos
    const paginatedProducts = products.slice(startIndex, endIndex);

    // Realizo el ordenamiento si se proporciona el parámetro sort
    if (sort === 'asc') {
      paginatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      paginatedProducts.sort((a, b) => b.price - a.price);
    }

    // Realizo el filtrado si se proporciona el parámetro query
    const filteredProducts = query
      ? paginatedProducts.filter(product => product.title.includes(query))
      : paginatedProducts;

    // Calculo el número total de páginas

    const totalPages = Math.ceil(filteredProducts.length / limit);

    // Construyo la respuesta con la información solicitada

    const response = {
      status: 'success',
      payload: filteredProducts,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}&query=${query}&sort=${sort}` : null,
      nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}&query=${query}&sort=${sort}` : null,
    };

    // Envío la respuesta como JSON
    res.json(response);
  } catch (error) {
    // En caso de error, respondo con un mensaje de error
    res.status(500).json({ error: 'Hubo un error al obtener los productos.' });
  }
};

//Obtengo todos los productos

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsManager.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const productId = req.params.pid; // Cambiar a req.params.pid

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
    const products = await productsManager.getByAvailability(availability); // Obtenemos la disponibilidad de los parámetros de la URL
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveProduct = async (req, res) => {
  const product = req.body;

  // Verifica si se ha subido una foto
  if (req.file) {
    product.photo = req.file.path;
  }

  try {
    const result = await productsManager.saveProducts(product);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  const productId = req.params.pid;

  try {
    await productsManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.pid;
  const updatedFields = req.body;

  try {
    await productsManager.updateProduct(productId, updatedFields);
    res.json({ message: 'Producto actualizado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductPrice = async (req, res) => {
  const productId = req.params.pid;
  try {
    const price = await productsManager.getProductPrice(productId);
    if (price) {
      res.json({ price });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


