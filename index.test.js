const request = require('supertest');
const http = require('http');
const app = require('./index');

let server;

describe('API tests for /api/v1/blocks/latest endpoint', () => {
    beforeAll(async (done) => {
        jest.setTimeout(10000);
        process.env.NODE_ENV = 'test';
        server = http.createServer(app);
        server.listen(done);
        done();
    });

    it('should get 10 blocks back', async (done) => {
        const numberOfBlocksToFetch = 10;
        const res = await request(app)
            .get(`/api/v1/block/latest/${numberOfBlocksToFetch}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('latestBlocks');
        expect(res.body.latestBlocks.length).toEqual(numberOfBlocksToFetch);

        done();
    });

    it('should get 404 error because of missing query param numberOfBlocks', async (done) => {
        const res = await request(app)
            .get(`/api/v1/block/latest`);

        expect(res.statusCode).toEqual(404);

        done();
    });

    afterAll(done => {
        server.close(done);
    });
});

