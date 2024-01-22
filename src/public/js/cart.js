function finalizePurchase(cartId) {
    // Realiza una solicitud al servidor para finalizar la compra
    fetch(`/api/carts/${cartId}/finalizePurchase/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Muestra una alerta o realiza otras acciones necesarias
        alert(data.message);
    })
    .catch(error => {
        console.error('Error en la solicitud al servidor:', error);
        // Maneja el error según tus necesidades
    });
}
function removeProductFromCart(cartId, productId) {
    fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Muestra una alerta con SweetAlert indicando que se eliminó el producto del carrito
        Swal.fire({
          title: 'Producto eliminado',
          text: data.message,
          icon: 'success',
        });
  
        // Recarga la página o realiza otras acciones necesarias
        location.reload();
      })
      .catch(error => {
        console.error('Error en la solicitud al servidor:', error);
        // Muestra una alerta de error o maneja el error según tus necesidades
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al eliminar el producto del carrito',
          icon: 'error',
        });
      });
  }

  