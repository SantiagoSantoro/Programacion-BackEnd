

// Función para actualizar la cantidad visualmente en la página
function updateQuantityDisplay(productId, quantity) {
    const quantityElement = document.getElementById(`quantity${productId}`);
    quantityElement.textContent = quantity;
}

// Función para incrementar la cantidad
function incrementQuantity(productId) {
    const quantityElement = document.getElementById(`quantity${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    updateQuantityDisplay(productId, quantity);
}

// Función para decrementar la cantidad
function decrementQuantity(productId) {
    const quantityElement = document.getElementById(`quantity${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
        quantity--;
        updateQuantityDisplay(productId, quantity);
    }
}
// Función para agregar un producto al carrito
function addProductToCart(productId, cartId) {
    console.log('User Cart ID:', cartId);  // Agrega este console.log para verificar el ID del carrito
    console.log('Adding product to cart with Product ID:', productId);
   
    

    // Envía una solicitud al servidor para agregar el producto al carrito
    const request = fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quantity: 1, // Puedes ajustar la cantidad según tus necesidades
        }),
    });

    // Loguea la respuesta del servidor
    request
        .then(response => {
            console.log('Server Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Fetch Data:', data);
            // Resto del código...
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            // Resto del código...
        });
}



