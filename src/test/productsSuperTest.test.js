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
            // console.log(body);
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
    it('El endpoint GET /api/products/availability/100 debe devolver un arreglo con todos los productos con disponibilidad 100', async () => {
        const availability = 100;
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
            // Verifica la estructura del error.
            expect(body).to.have.property('error');
        } else {
            // Verifica el código de estado 400.
            expect(statusCode).to.equal(400);
            expect(ok).to.be.false;
        }
    });

    after(async () => {
        await mongoose.connection.close();
    });
});