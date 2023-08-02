// DESARROLLO BACKEND

// CLASE 1 //

// const nombre = "Santiago";
// const apellido = "Santoro";
// const edad = 35;
// const seriesFavoritas = ["Mr. Robot", "Vikings", "Breaking Bad"];
// const peliculasFavoritas = [
//     {
//         nombre: "El Club De La Pelea",
//         estreno: 1999,
//         protagonistas: [
//             "Brad Pitt",
//             "Edward Norton"
//         ]
//     }
// ];

// console.log(nombre);
// console.log(apellido);
// console.log(edad);
// console.log(seriesFavoritas);
// console.log(peliculasFavoritas);


// CLASE 2 //

// function mostrarLista(lista) {
//     if (lista.length > 0) {
//       console.log(lista);
//     } else {
//       console.log("lista vacía");
//     }
//   }

//   // Datos de prueba con una lista no vacía
//   const listaNoVacia = [1, 2, 3, 4, 5];
//   mostrarLista(listaNoVacia);

//   // Datos de prueba con una lista vacía
//   const listaVacia = [];
//   mostrarLista(listaVacia);


//   function crearMultiplicador(numero) {
//     return function(segundoNumero) {
//       return numero * segundoNumero;
//     };
//   }

//   // Crear las funciones "duplicar" y "triplicar"
//   const duplicar = crearMultiplicador(2);
//   const triplicar = crearMultiplicador(3);

//   // Probar las funciones con diferentes valores
//   console.log(duplicar(4)); // Resultado: 8 (2 * 4)
//   console.log(duplicar(7)); // Resultado: 14 (2 * 7)
//   console.log(triplicar(5)); // Resultado: 15 (3 * 5)
//   console.log(triplicar(2)); // Resultado: 6 (3 * 2)

// class Contador {
//     static contadorGlobal = 0;

//     constructor(responsable) {
//       this.responsable = responsable;
//       this.valorIndividual = 0;
//       Contador.contadorGlobal++;
//     }

//     incrementar() {
//       this.valorIndividual++;
//       Contador.contadorGlobal++;
//     }

//     decrementar() {
//       this.valorIndividual--;
//       Contador.contadorGlobal--;
//     }

//     obtenerResponsable() {
//       return this.responsable;
//     }

//     obtenerCuentaIndividual() {
//       return this.valorIndividual;
//     }

//     obtenerCuentaGlobal() {
//       return Contador.contadorGlobal;
//     }

//     contar() {
//       this.valorIndividual++;
//       Contador.contadorGlobal++;
//     }
//   }
//   const contador1 = new Contador("Juan");
//   const contador2 = new Contador("María");

//   console.log(contador1.obtenerResponsable()); // Resultado: "Juan"
//   console.log(contador2.obtenerResponsable()); // Resultado: "María"

//   console.log(contador1.obtenerCuentaIndividual()); // Resultado: 0
//   console.log(contador2.obtenerCuentaIndividual()); // Resultado: 0

//   contador1.contar();
//   contador1.contar();
//   contador2.contar();

//   console.log(contador1.obtenerCuentaIndividual()); // Resultado: 2
//   console.log(contador2.obtenerCuentaIndividual()); // Resultado: 1

//   console.log(contador1.obtenerCuentaGlobal()); // Resultado: 3
//   console.log(contador2.obtenerCuentaGlobal()); // Resultado: 3

// CLASE 3 

// const objetos = [
//     {
//         manzanas: 3,
//         peras: 2,
//         carne: 1,
//         jugos: 5,
//         dulces: 2
//     },
//     {
//         manzanas: 1,
//         sandias: 1,
//         huevos: 6,
//         jugos: 1,
//         panes: 4
//     }
// ];

// // Crear un objeto vacío para almacenar los tipos de productos
// const tiposProductos = {};

// // Recorrer cada objeto en el arreglo
// objetos.forEach(objeto => {
//     // Recorrer las propiedades de cada objeto
//     Object.keys(objeto).forEach(producto => {
//         // Agregar el tipo de producto al objeto tiposProductos
//         tiposProductos[producto] = true;
//     });
// });

// // Crear un nuevo arreglo con los tipos de productos
// const listaTiposProductos = Object.keys(tiposProductos);

// console.log(listaTiposProductos);

// let arrayAnidado = [1,2,3,55,[432,2],66,77]
// console.log(arrayAnidado.flat())
// console.log(arrayAnidado)

// class TicketManager {

//     #precioBaseGanancia = 0.15;

//     constructor() {
//         this.eventos = [];
//     }
//     getEventos = () => {
//         return this.eventos;
//     }

//     agregarEventos = (nombre, lugar, precio, cantidad= 50, fecha = new Date().toLocalDateString()) => {
//         const evento = {
//             nombre,
//             lugar,
//             precio: precio + precio *this.#precioBaseGanancia,
//             capacidad,
//             fecha,
//             participantes: []
//         }
//         if (this.eventos.length ===0) {
//             evento.id = 1;
//         } else {
//             evento.id = this.eventos[this.eventos.length -1].id + 1;
//         }

//     }
//     agregarUsuario = (idEvento, idUsuario) => {
//         const eventoIndex = this.eventos.findIndex(e=>e.id === idEvento);
//         if(eventoIndex === -1) {
//             console.log("Evento no encontrado");
//             return;
//         }
//         const eventoElegido = eventoElegido.participantes.includes(idUsuario);


//         const usuarioRegistrado = this.evento[eventoIndex].participantes.includes(idUsuario);
//         if (usuarioRegistrado) {
//             console.log("Usuario registrado");
//             return;
//         }
//         eventoElegido.participantes.push(idUsuario);
//     }
//     ponerEventoEnGira = (idEvento, nuevaLocalidad, nuevaFecha) => {
//         const eventoIndex = this.eventos.findIndex(e=>e.id === idEvento);
//         if(eventoIndex === -1) {
//             console.log("Evento no encontrado");
//             return;
//         }

//     }



// };

// const clase1 = new TicketManager()
// clase1.agregarEventos()

// class ProductManager {
//     constructor() {
//       this.products = [];
//       this.productId = 1;
//     }

//     addProduct(product) {
//       // Validar que todos los campos sean obligatorios
//       if (
//         !product.title ||
//         !product.description ||
//         !product.price ||
//         !product.thumbnail ||
//         !product.code ||
//         !product.stock
//       ) {
//         console.log("Todos los campos son obligatorios.");
//         return;
//       }

//       // Validar que no se repita el campo "code"
//       const existingProduct = this.products.find(
//         (p) => p.code === product.code
//       );
//       if (existingProduct) {
//         console.log("Ya existe un producto con el mismo código.");
//         return;
//       }

//       // Agregar el producto al arreglo con un id autoincrementable
//       product.id = this.productId++;
//       this.products.push(product);
//       console.log("Producto agregado exitosamente.");
//     }

//     getProducts() {
//       return this.products;
//     }

//     getProductById(id) {
//       const product = this.products.find((p) => p.id === id);
//       if (product) {
//         return product;
//       } else {
//         console.log("Producto no encontrado.");
//       }
//     }
//   }

// CLASE 4 PROMESAS Y ASINCRONISMO 

// Calculadora positiva //

// const suma = (num1, num2) => {
//     return new Promise((resolve, reject) => {
//         if (num1 === 0 || num2 === 0) {
//             reject("Operación innecesaria")
//         }
//         if (num1 + num2 < 0) {
//             reject("La calculadora solo debe devolver valores positivos")
//         }
//         resolve(num1 + num2);
//     })
// }

// const resta = (num1, num2) => {
//     return new Promise((resolve, reject) => {
//         if (num1 === 0 || num2 === 0) {
//             reject("Operación innecesaria")
//         }
//         if (num1 - num2 < 0) {
//             reject("La calculadora solo debe devolver valores positivos")
//         }
//         resolve(num1 - num2);
//     })
// }

// const multiplicacion = (num1, num2) => {
//     return new Promise((resolve, reject) => {
//         if (num1 < 0 || num2 < 0) {
//             reject("La calculadora solo debe devolver valores positivos")
//         }
//         resolve(num1 * num2);
//     })
// }

// const division = (num1, num2) => {
//     return new Promise((resolve, reject) => {
//         if (num1 < 0 || num2 < 0) {
//             reject("La calculadora solo debe devolver valores positivos")
//         }
//         resolve(num1 / num2);
//     })
// }

// const calculos = async () => {
//     try {
//         const num1 = 10;
//         const num2 = 5;

//         const resultSuma = await suma(num1, num2);
//         console.log(resultSuma);

//         const resultResta = await resta(num1, num2);
//         console.log(resultResta);

//         const resultMultiplicacion = await multiplicacion(num1, num2);
//         console.log(resultMultiplicacion);

//         const resultDivision = await division(num1, num2);
//         console.log(resultDivision);

//     } catch (error) {
//         console.error("Error:", error);
//     }
// }
// calculos();

// CLASE 4 //

// Menejor de archivos en Javascript //

// Actividad: Almacenar Fecha y Hora con callback //

// const fs = require('fs');

// const fecha = new Date().toLocaleDateString();
// const hora = new Date().toLocaleTimeString();

// const path = 'fecha.txt';

// fs.writeFile(path, `Fecha: ${fecha} - Hora: ${hora}`,(error) => {
//     if (error) {
//         console.error(error);
//     }
//     fs.readFile(path, 'utf-8', (error, data) => {
//         if (error) {
//             console.error(error);
//         }
//         console.log(data);
//     })
// })

// const fs = require('fs');

// const operacionesAsincronicas = async () => {
//   try {
//     // Escribir en el archivo
//     await fs.promises.writeFile('ejemploPromesa.txt', 'Hola desde promesa');

//     // Leer el contenido del archivo
//     let resultado = await fs.promises.readFile('ejemploPromesa.txt', 'utf-8');
//     console.log(resultado);

//     // Agregar contenido adicional al archivo
//     await fs.promises.appendFile('ejemploPromesa.txt', ' Contenido adicional');

//     // Leer el contenido actualizado del archivo
//     resultado = await fs.promises.readFile('ejemploPromesa.txt', 'utf-8');
//     console.log(resultado);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// // Llamamos a la función asincrónica
// operacionesAsincronicas();

// Actividad : Lectura y escritura de archivos //


// const fs = require('fs');

// const manejoJson = async () => {
//   try {
//     const data = await fs.promises.readFile('package.json', 'utf-8');
//     const info = {
//       contenidoStr: data,
//       contenidoObj: JSON.parse(data),
//     };
//     console.log(info);
//     await fs.promises.writeFile('info.json', JSON.stringify(info));
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// manejoJson();

// Hands On Lab //

//Manager de usuarios //

// CLASE 5
// NODE JS

// const obj = {

// }

// for (let index = 0; index < 10000; index++) {
//     let number = Math.floor(Math.random() * 20 + 1);
//     if (!obj[number]) {
//         obj[number] = 1
//     } else {
//         obj[number]++
//     }
// }

// console.log(obj)

// Hands On Lab //

// const fs = require('fs');

// const path = 'Usuarios.json'
// class ManagerUsuarios {
//     constructor() {

//     }
//     consultarUsuarios = async () => {
//         if (fs.existsSync(path)) {
//             const data = await fs.promises.readFile(path, 'utf-8');
//             const user = JSON.parse(data);
//             return user;
//         } else {
//             return [];
//         }
//     }
//     crearUsuario = async (usuario) => {
//         const users = await this.consultarUsuarios();
//         users.push(usuario);
//         await fs.promises.writeFile(path, JSON.stringify(users))
//     }
// }

// module.exports = ManagerUsuarios;

// const moment = require('moment');

// const hoy = moment();

// const fechaDeNacimiento = moment('1988-01-11', 'YYYY-MM-DD');

// const edad = hoy.diff(fechaDeNacimiento, 'years');

// console.log(edad);

