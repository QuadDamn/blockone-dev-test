const request = require('supertest');
const {app, getLatestBlocks} = require('./index');
const http = require('http');
const fetch = require('node-fetch');
const {JsonRpc} = require('eosjs');

let server, rpc, blockchainInfo;

describe('API tests for /blocks/latest endpoint', () => {
    beforeAll(async (done) => {
        process.env.NODE_ENV = 'test';
        server = http.createServer(app);
        server.listen(done);
        done();
    });

    it('should get 10 blocks back', async (done) => {
        const res = await request(app)
            .get('/blocks/latest');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('latestBlocks');
        expect(res.body.latestBlocks.length).toEqual(10);

        done();
    });

    afterAll(done => {
        server.close(done);
    });
});

describe('Functional tests for getLatestBlocks function', () => {
    beforeAll(async (done) => {
        rpc = new JsonRpc('https://api.eosnewyork.io', { fetch });
        blockchainInfo = await rpc.get_info();
        done();
    });

    it('should get 8 blocks back', async (done) => {
        const numberOfBlocksToFetch = 8;
        const latestBlocks = await getLatestBlocks(rpc, blockchainInfo.head_block_num, numberOfBlocksToFetch);

        expect(Array.isArray(latestBlocks)).toBe(true);
        expect(latestBlocks.length).toEqual(numberOfBlocksToFetch);

        done();
    });

    it('should get 0 blocks back because didn\'t pass a starting block', async (done) => {
        const numberOfBlocksToFetch = 8;
        const latestBlocks = await getLatestBlocks(rpc, '', numberOfBlocksToFetch);

        expect(Array.isArray(latestBlocks)).toBe(true);
        expect(latestBlocks.length).toEqual(0);

        done();
    });

    it('should get 10 blocks back because didn\'t pass an argument for the numberOfBlocksToFetch 3rd parameter of the getLatestBlocks function and 10 is the default value.', async (done) => {
        const latestBlocks = await getLatestBlocks(rpc, blockchainInfo.head_block_num);

        expect(Array.isArray(latestBlocks)).toBe(true);
        expect(latestBlocks.length).toEqual(10);

        done();
    });

    it('should get 0 blocks back because passed an argument of 0 for the numberOfBlocksToFetch of the getLatestBlocks function, even though we passed a valid startingBlock.', async (done) => {
        const latestBlocks = await getLatestBlocks(rpc, blockchainInfo.head_block_num, 0);

        expect(Array.isArray(latestBlocks)).toBe(true);
        expect(latestBlocks.length).toEqual(0);

        done();
    });
});

