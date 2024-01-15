// Declara cartId en el ámbito globalz
let cartId;
let userId;

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

async function fetchCartId() {
    try {
        const response = await fetch(`/api/carts/`, {
            credentials: 'include',  // Incluye las cookies de sesión en la solicitud
        });

        const data = await response.json();

        console.log('Respuesta del servidor:', data);

        // Comprueba si hay información de usuario autenticado y carrito asociado
        if (data.user && data.user.cart && data.user.cart._id) {
            return data.user.cart._id;  // Utiliza el ID del carrito del usuario autenticado
        }

        // Si no hay información de usuario autenticado o carrito asociado, lanza un error
        throw new Error('No se pudo obtener el ID del carrito');
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
    }
}


// Llama a fetchCartId y luego inicializa la página
fetchCartId().then(() => {
    // Al cargar la página, inicializa la cantidad de productos en 0
    const products = document.querySelectorAll('.product-grid li');
    products.forEach(product => {
        const productId = product.getAttribute('data-product-id');
        updateQuantityDisplay(productId, 0);
    });
});

// Resto del código para addProductToCart y otras funciones...



function addProductToCart(productId) {
    // Obtén la cantidad actual del producto
    const quantityElement = document.getElementById(`quantity${productId}`);
    let quantity = parseInt(quantityElement.textContent);

    console.log('Cart ID:', cartId);

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
                console.error('Error al agregar el producto al carrito:', data.error);
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





