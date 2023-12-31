export const errorDictionary = {
  INVALID_PRODUCT: 'El producto no es válido.',
  PRODUCT_NOT_FOUND: 'El producto no se encuentra.',
  ERROR_GETTING_PRODUCTS: 'Error al obtener los productos.',
  ERROR_GETTING_PRODUCTS_BY_CATEGORY: 'Error al obtener los productos por categoría',
  PRODUCT_BELONGS_TO_USER: 'El producto pertenece al usuario y no puede ser agregado al carrito.',
  PRODUCTS_NOT_FOUND_FOR_AVAILABILITY: 'No se encontraron productos para la disponibilidad dada.',
  INSUFFICIENT_STOCK: 'No hay suficiente stock disponible para el producto solicitado.',
  DUPLICATE_PRODUCT: 'El producto ya está en el carrito.',
  CART_EMPTY: 'El carrito de compras está vacío.',
  INVALID_QUANTITY: 'La cantidad proporcionada no es válida.',
  ORDER_NOT_FOUND: 'La orden de compra no se encuentra.',
  ORDER_ALREADY_SHIPPED: 'La orden ya ha sido enviada y no se pueden realizar cambios.',
  PAYMENT_ERROR: 'Hubo un error en el procesamiento del pago.',
  UNAUTHORIZED_ACCESS: 'Acceso no autorizado. Debes iniciar sesión.',
  FORBIDDEN_ACTION: 'No tienes permisos para realizar esta acción.',
  CARTS_NOT_FOUND: 'No hay carritos disponibles.', 
  INVALID_CART_ID: 'El ID del carrito no es válido.',
  INVALID_CART_DATA: 'Los datos del carrito no son válidos.',
  INVALID_PRODUCT_ID: 'El ID del producto no es válido.',
  INVALID_USER: 'Usuario no válido.',
  USER_ALREADY_EXISTS: 'El usuario ya existe.',
  INVALID_CREDENTIALS: 'Credenciales de inicio de sesión no válidas.',
  INVALID_SESSION: 'La sesión no es válida.',
};


  
  export const handleError = (error) => {
    return errorDictionary[error] || 'Error desconocido';
  };