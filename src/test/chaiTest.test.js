import mongoose from 'mongoose';
import carts from '../dao/managers/mongodb/carts.js';
import chai from 'chai';
import { config } from '../config/config.js';
import { createHash } from '../utils.js'

mongoose.connect(config.databaseUrl);

const expect = chai.expect;

describe('Set de test con chai', () => {
    before(function () {
        this.carts = new carts();
    });

    beforeEach(function () {
        this.timeout(5000);
    });

    it('El Dao debe poder obtener los carritos en formato de arreglo', async function () {
        const result = await this.carts.getAll();
        expect(Array.isArray(result)).to.be.equals(true);
    });

    it('Se debe realizar un hasheo efectivo del password', async function () {
        const mockUser = {
            first_name: "Esteban",
            last_name:"Santoro",
            email: "2@2",
            age: 34,
            password: "$2a$10$k2liYl284U4PNvBykjpCr.V5YK71WExEBZHkPQuz7EDXklhuwfC46",
            role: "user"
        }
        const passwordHarsh = createHash(mockUser.password);


        expect(mockUser.password).to.be.not.equals(passwordHarsh);
    });

})