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
let cartId = getCartById(cartId); // Asegúrate de tener esta función definida en tu código
function addProductToCart(productId) {
    // Obtén la cantidad actual del producto
    const quantityElement = document.getElementById(`quantity${productId}`);
    let quantity = parseInt(quantityElement.textContent);

    // ... (tu código para obtener información del producto)

    // Envía una solicitud al servidor para agregar el producto al carrito
    fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quantity: quantity, // Envía la cantidad actualizada al servidor
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Actualiza la vista del carrito o realiza otras acciones necesarias
        if (data.status === 'success') {
            // Puedes mostrar una notificación o actualizar el carrito de forma dinámica
            console.log('Producto agregado al carrito con éxito.');

            // Actualiza la cantidad en la vista después de agregar al carrito
            updateQuantityDisplay(productId, 0);
        } else {
            console.error('Error al agregar el producto al carrito.');
            // Revierte la cantidad si hay un error
            decrementQuantity(productId);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud al servidor:', error);
        // Revierte la cantidad si hay un error
        decrementQuantity(productId);
    });
}


// Al cargar la página, inicializa la cantidad de productos en 0
window.onload = function() {
    const products = document.querySelectorAll('.product-grid li');
    products.forEach(product => {
        const productId = product.getAttribute('data-product-id');
        updateQuantityDisplay(productId, 0);
    });
};


    
