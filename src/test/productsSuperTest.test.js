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
            console.log(body);
        });
    });
    it('El endpoint GET /api/products/:pid debe devolver un producto por su ID', async () => {
        const productId = '65031c6eec0feafb55eb7094';
        const { statusCode, ok, body } = await requester.get(`/api/products/${productId}`).send();
        expect(statusCode).to.equal(200);
        expect(ok).to.be.true;
        expect(body).to.be.an('object');
        expect(body).to.have.property('products')
    });
    after(async () => {
        await mongoose.connection.close();
    });
});