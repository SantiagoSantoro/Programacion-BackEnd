// En cart.js

// Función para obtener el cartId
async function getCartById() {
    try {
      const response = await fetch('/api/carts/${cartId}/product/${productId}'); // Asegúrate de tener la ruta correcta
      const data = await response.json();
      return data.cartId; // Ajusta esto según la respuesta de tu servidor
    } catch (error) {
      console.error('Error al obtener el cartId:', error);
      // Manejar el error según tus necesidades
    }
  }
  
  // Función para agregar un producto al carrito
  let cartId;
  
  // Al cargar la página, inicializa la variable cartId
  window.onload = async function () {
    cartId = await getCartById();
  };
  
  function addProductToCart(productId) {
    // Resto del código para agregar el producto al carrito
    // Usa la variable cartId
    // ...
  }
  
  // Resto del código de cart.js
  