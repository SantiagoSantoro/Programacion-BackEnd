import mongoose from 'mongoose';
import carts from '../dao/managers/mongodb/carts.js';
import Assert from 'assert';
import {config} from '../config/config.js'

mongoose.connect(config.databaseUrl);

const assert = Assert.strict;

describe('Testing Carts Dao', function () {
    before(function () {
        this.carts = new carts();
    });

    beforeEach(function () {
        this.timeout(5000);
    });

    it('El get debe devolver un arreglo', async function () {
        console.log(this.carts);
        const result = await this.carts.getAll();
        assert.strictEqual(Array.isArray(result), true);
    });
    
});