export const errorDictionary = {
    INVALID_PRODUCT: 'El producto no es válido.',
    PRODUCT_NOT_FOUND: 'El producto no se encuentra.',
    INSUFFICIENT_STOCK: 'No hay suficiente stock disponible para el producto solicitado.',
    DUPLICATE_PRODUCT: 'El producto ya está en el carrito.',
    CART_EMPTY: 'El carrito de compras está vacío.',
    INVALID_QUANTITY: 'La cantidad proporcionada no es válida.',
    ORDER_NOT_FOUND: 'La orden de compra no se encuentra.',
    ORDER_ALREADY_SHIPPED: 'La orden ya ha sido enviada y no se pueden realizar cambios.',
    PAYMENT_ERROR: 'Hubo un error en el procesamiento del pago.',
    UNAUTHORIZED_ACCESS: 'Acceso no autorizado. Debes iniciar sesión.',
    FORBIDDEN_ACTION: 'No tienes permisos para realizar esta acción.',
  };
  
  export const handleError = (error) => {
    return errorDictionary[error] || 'Error desconocido';
  };