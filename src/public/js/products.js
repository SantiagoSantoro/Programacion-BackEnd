

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

function addProductToCart(productId, cartId, stock) {
    const quantityElement = document.getElementById(`quantity${productId}`);
    const quantity = parseInt(quantityElement.textContent);

    // Verifica si la cantidad seleccionada es mayor que el stock disponible
    if (quantity > stock) {
        console.error('No hay suficiente stock disponible.');
        return;
    }

    console.log('User Cart ID:', cartId);
    console.log('Adding product to cart with Product ID:', productId);

    try {
        // Envía una solicitud al servidor para agregar el producto al carrito
        fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Actualiza la vista del carrito o realiza otras acciones necesarias
                if (data.status === 'success') {
                    console.log('Producto agregado al carrito con éxito.');
                    // Actualiza la cantidad en la vista después de agregar al carrito
                    updateQuantityDisplay(productId, 0); // Reinicia la cantidad a 0
                } else {
                    console.error('Error al agregar el producto al carrito:', data.error);
                    // Maneja el error según tus necesidades
                }
            })
            .catch(error => {
                console.error('Error en la solicitud al servidor:', error);
                // Maneja el error según tus necesidades
            });
    } catch (error) {
        console.log(error);
    }
}








