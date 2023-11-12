// Valida si el ID del carrito es válido
export const isValidCart = (cartId) => {
  // Implementa la lógica de validación según tus necesidades
  return typeof cartId === 'string' && cartId.length > 0;
};

// Valida si el ID del producto es válido
export const isValidProduct = (productId) => {
  // Implementa la lógica de validación según tus necesidades
  return typeof productId === 'string' && productId.length > 0;
};

// Valida si la cantidad es válida
export const isValidQuantity = (quantity) => {
  // Implementa la lógica de validación según tus necesidades
  return typeof quantity === 'number' && quantity > 0;
};
