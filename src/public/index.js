const server = io().connect('http://localhost:8080');

const render = (products) => {
    let listado = document.querySelector('#listado');
    let html = products.map(prod => {
        return `
            <li>
                <strong>Title: ${prod.title}</strong>
                <em>Price: ${prod.price}</em>
            </li>
        `;
    });
    listado.innerHTML = html.join(' ');
};

const addProduct = (evt) => {
    const title = document.querySelector('#title').value;
    const price = document.querySelector('#price').value;
    const product = { title, price };

    server.emit('producto-nuevo', product, (id) => {
        console.log(id);
    });

    return false;
};

/* Listening for a message from the server. */
server.on('mensaje-servidor', mensaje => {
    render(mensaje.products);
});

