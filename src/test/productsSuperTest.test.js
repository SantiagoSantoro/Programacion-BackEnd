import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing de Products con supertest', () => {
    describe('Test de Products', () => {
        it('El endpoint GET /api/products debe devolver un arreglo con todos los productos', async () => {
            const { statusCode, ok, body } = await requester.get('/api/products').send();
            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;
            expect(body).to.not.have.property('products')
        });
    });

    it('El endpoint GET /api/products/:pid debe devolver un producto por su ID', async () => {
        const productId = '65031cc5ec0feafb55eb7096';
        const { statusCode, ok, body } = await requester.get(`/api/products/${productId}`).send();
        expect(statusCode).to.equal(200);
        expect(ok).to.be.true;
        expect(body).to.be.an('object');
        expect(body).to.have.property('products')
    });

    it('El endpoint GET /api/products/category/Ropa debe devolver un arreglo con todos los productos de la categoría Ropa', async () => {
        const category = 'Ropa';
        const { statusCode, ok, body } = await requester.get(`/api/products/category/${category}`).send();
        expect(statusCode).to.equal(200);
        expect(ok).to.be.true;
        expect(body).to.be.an('array');
        expect(body.length).to.be.greaterThan(0);
        expect(body[0]).to.have.property('category');
        expect(body[0].category).to.equal('Ropa');
    });

    it('El endpoint GET /api/products/category/NoExistente debe devolver un código de estado 404', async () => {
        const category = 'NoExistente';
        const { statusCode, ok } = await requester.get(`/api/products/category/${category}`).send();
        expect(statusCode).to.equal(404);
        expect(ok).to.be.false;
    });

    it('El endpoint GET /api/products/availability/75 debe devolver un arreglo con todos los productos con disponibilidad 100', async () => {
        const availability = 75;
        const { statusCode, ok, body } = await requester.get(`/api/products/availability/${availability}`).send();
        expect(statusCode).to.equal(200);
        expect(ok).to.be.true;
        expect(body).to.be.an('array');
        expect(body.length).to.be.greaterThan(0); // Verifica que haya al menos un producto con la disponibilidad especificada.
        expect(body[0]).to.have.property('stock');
        expect(body[0].stock).to.equal(availability);
    });

    it('El endpoint GET /api/products/availability/sin-stock debe devolver un error', async () => {
        const availability = 'sin-stock';
        const { statusCode, ok, body } = await requester.get(`/api/products/availability/${availability}`).send();
        if (statusCode === 500) {
            expect(body).to.have.property('error');
        } else {
            expect(statusCode).to.equal(400);
            expect(ok).to.be.false;
        }
    });

    describe('Test de la ruta de actualización de Products', () => {
        it('El endpoint PUT /api/products/:productId debe actualizar el precio de un producto existente como administrador', async () => {
          const productId = '65031cc5ec0feafb55eb7096';
          const updatedProductData = {
            price: 300, // Nuevo precio del producto
          };
          const authResponse = await requester
            .post('/api/sessions/login')
            .send({ email: 'admincoder@coder.com', password: 'CoderSecret' });
          const sessionCookie = authResponse.headers['set-cookie'];
          const response = await requester
            .put(`/api/products/${productId}`)
            .set('Cookie', sessionCookie)
            .send(updatedProductData)
            .expect(200);
      
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal('Producto actualizado exitosamente.');
          // No necesitas el done() aquí
        });
      });
      
        // describe('Test de la ruta de eliminación de Products', () => {
        //     it('El endpoint DELETE /api/products/:productId debe permitir eliminar un producto si el usuario está logueado como administrador', async () => {
        //         const productId = '65031cc5ec0feafb55eb7096'; // OJO con éste test porque elimina el producto en la BD
        //         const authResponse = await requester
        //             .post('/api/sessions/login')
        //             .send({ email: 'admincoder@coder.com', password: 'CoderSecret' });
        //         const sessionCookie = authResponse.headers['set-cookie'];

        //         // Realiza la solicitud DELETE a la ruta del producto específico, incluyendo la cookie de sesión
        //         const response = await requester
        //             .delete(`/api/products/${productId}`)
        //             .set('Cookie', sessionCookie)  // Utiliza la cookie de sesión en lugar de 'Authorization'
        //             .expect(200);

        //         // Verifica que se obtenga el mensaje esperado
        //         expect(response.body).to.have.property('message');
        //         expect(response.body.message).to.equal('Producto eliminado exitosamente.');
        //     });
        // });

    });



    after(async () => {
        await mongoose.connection.close();
    });
