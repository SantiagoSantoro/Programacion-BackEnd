import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing de Carts con supertest', () => {
    describe('Test de Carts', () => {
        it('El endpoint GET /api/carts debe devolver un arreglo con todos los carritos', async () => {
            const { statusCode, ok, body } = await requester.get('/api/carts').send();
            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;
            expect(body).to.be.an('array');
        });

        it('El endpoint POST /api/carts debe crear un nuevo carrito asociado a un usuario', async () => {
            const newCart = {
                userId: '652336b3922641f0698102d4',
            };
            const { statusCode, ok, body } = await requester.post('/api/carts').send(newCart);
            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;
            expect(body).to.be.an('object');
            expect(body).to.have.property('cart');
        });

        it('El endpoint GET /api/carts/:cartId debe devolver un carrito por su ID', async () => {
            const cartId = '656f6e2c9241ff98a3fcf92b';
            const { statusCode, ok, body } = await requester.get(`/api/carts/${cartId}`).send();
            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;
            expect(body).to.be.an('object');
            expect(body).to.have.property('cart');
            expect(body.cart).to.be.an('object');
            expect(body.cart._id).to.equal(cartId);
        });

        describe('Test de productos agregados y modificados al carrito', () => {
            it('El endpoint POST /api/carts/:cartId/product/:productId debe permitir agregar un producto al carrito si el usuario está logueado', async () => {
                const authResponse = await requester.post('/api/sessions/login')
                    .send({ email: 'santiagosantoro10@gmail.com', password: 'milo2016' });
                const sessionCookie = authResponse.headers['set-cookie'];
                const cartId = '656f6e2c9241ff98a3fcf92b';
                const productId = '65031c6eec0feafb55eb7094';
                const { statusCode, ok, body } = await requester
                    .post(`/api/carts/${cartId}/product/${productId}`)
                    .set('Cookie', sessionCookie)
                    .send({
                        productId: '65031c6eec0feafb55eb7094',
                        quantity: 1
                    });

                expect(statusCode).to.equal(200);
                expect(ok).to.be.true;
                expect(body).to.be.an('object');
                expect(body).to.have.property('message');
                expect(body.message).to.equal('Producto agregado al carrito con éxito.');
            });

            it('El endpoint PUT /api/carts/:cartId/product/:productId debe permitir actualizar la cantidad de un producto en el carrito si el usuario está logueado', async () => {
                const authResponse = await requester
                    .post('/api/sessions/login')
                    .send({ email: 'santiagosantoro10@gmail.com', password: 'milo2016' });
                const sessionCookie = authResponse.headers['set-cookie'];
                const cartId = '656f6e2c9241ff98a3fcf92b';
                const productId = '65031c6eec0feafb55eb7094';
                const { statusCode, ok, body } = await requester
                    .put(`/api/carts/${cartId}/product/${productId}`)
                    .set('Cookie', sessionCookie)
                    .send({
                        productId: '65031c6eec0feafb55eb7094',
                        quantity: 4 // Nueva cantidad deseada
                    });

                expect(statusCode).to.equal(200);
                expect(ok).to.be.true;
                expect(body).to.be.an('object');
                expect(body).to.have.property('message');
                expect(body.message).to.equal('Cantidad del producto actualizada con éxito.');
            });

            describe('Test de productos eliminados del carrito', () => {
                it('El endpoint DELETE /api/carts/:cartId/product/:productId debe permitir eliminar un producto del carrito si el usuario está logueado', async () => {
                    const authResponse = await requester
                        .post('/api/sessions/login')
                        .send({ email: 'santiagosantoro10@gmail.com', password: 'milo2016' });
                    const sessionCookie = authResponse.headers['set-cookie'];
                    const cartId = '656f6e2c9241ff98a3fcf92b';
                    const productId = '65031c6eec0feafb55eb7094';
                    const { statusCode, ok, body } = await requester
                        .delete(`/api/carts/${cartId}/product/${productId}`)
                        .set('Cookie', sessionCookie)
                        .send({
                            productId: '65031c6eec0feafb55eb7094',
                            quantity: 3 // Nueva cantidad deseada
                        });

                    expect(statusCode).to.equal(200);
                    expect(ok).to.be.true;
                    expect(body).to.be.an('object');
                    expect(body).to.have.property('message');
                    expect(body.message).to.equal('Producto eliminado del carrito con éxito.');
                });

            });

            it('El endpoint DELETE /api/carts/:cartId debe permitir eliminar todos los productos del carrito si el usuario está logueado', async () => {
                const authResponse = await requester
                    .post('/api/sessions/login')
                    .send({ email: 'santiagosantoro10@gmail.com', password: 'milo2016' });
                const sessionCookie = authResponse.headers['set-cookie'];
                const cartId = '656f6e2c9241ff98a3fcf92b';
                const { statusCode, ok, body } = await requester
                    .delete(`/api/carts/${cartId}`)
                    .set('Cookie', sessionCookie);

                expect(statusCode).to.equal(200);
                expect(ok).to.be.true;
                expect(body).to.be.an('object');
                expect(body).to.have.property('message');
                expect(body.message).to.equal('Todos los productos del carrito eliminados con éxito.');
            });

            after(async () => {
                await mongoose.connection.close();
            });
        });
    });
});

