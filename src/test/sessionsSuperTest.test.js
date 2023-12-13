import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';


const expect = chai.expect;
const requester = supertest('http://localhost:8080');


describe('Testing de Sessions con supertest', () => {
    describe('Testing de Sessions', () => {
        it('El endpoint POST /api/sessions/login debe devolver un código de estado 200 si el inicio de sesión es exitoso', async () => {
            const user = {
                email: 'santiagosantoro10@gmail.com',
                password: 'milo2016',
            };
            const { statusCode, ok, body } = await requester.post('/api/sessions/login').send(user);
            expect(statusCode).to.equal(200);
            expect(ok).to.equal(true);
        });
    });
    it('El endpoint POST /api/sessions/logout debe desloguear al usuario', async () => {
        // Loguea al usuario
        const loginResponse = await requester.post('/api/sessions/login').send({
            email: 'santoroosvaldo@hotmail.com',
            password: 'yopuedo',
        });

        // Extrae el token de la respuesta
        const token = loginResponse.body.token;

        // Envía una solicitud POST al endpoint /logout con el token
        const logoutResponse = await requester.post('/api/sessions/logout').set('Authorization', `Bearer ${token}`);
    });
   
      
    after(async () => {
        await mongoose.connection.close();
    });
});
