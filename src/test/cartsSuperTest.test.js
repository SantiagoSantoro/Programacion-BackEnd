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
                userId: '65244be5a4a3dcc99aadf677',
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

        after(async () => {
            await mongoose.connection.close();
        });
    });
});
