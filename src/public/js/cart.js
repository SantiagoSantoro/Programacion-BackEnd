function finalizePurchase(cartId) {
    // Realiza una solicitud al servidor para finalizar la compra
    fetch(`/api/carts/${cartId}/finalizePurchase`, {
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

  