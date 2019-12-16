const ChainAPITest = require('./ChainAPI');

let chainAPIInstance;
let blockchainInfo;

describe('Functional tests for Chain API class', () => {
    beforeAll(async (done) => {
        jest.setTimeout(10000);
        chainAPIInstance = new ChainAPITest();
        blockchainInfo = await chainAPIInstance.getInfo();
        done();
    });

    it('should get 8 blocks back', async (done) => {
        const numberOfBlocksToFetch = 8;
        const latestBlocks = await chainAPIInstance.getLatestBlocks(blockchainInfo.head_block_num, numberOfBlocksToFetch);

        expect(Array.isArray(latestBlocks)).toBe(true);
        expect(latestBlocks.length).toEqual(numberOfBlocksToFetch);

        done();
    });

    it('should get 0 blocks back because didn\'t pass a starting block', async (done) => {
        const numberOfBlocksToFetch = 8;
        const latestBlocks = await chainAPIInstance.getLatestBlocks('', numberOfBlocksToFetch);

        expect(Array.isArray(latestBlocks)).toBe(true);
        expect(latestBlocks.length).toEqual(0);

        done();
    });

    it('should get 0 blocks back because passed an argument of 0 for the numberOfBlocksToFetch of the getLatestBlocks function, even though we passed a valid startingBlock.', async (done) => {
        const numberOfBlocksToFetch = 0;
        const latestBlocks = await chainAPIInstance.getLatestBlocks(blockchainInfo.head_block_num, numberOfBlocksToFetch);

        expect(Array.isArray(latestBlocks)).toBe(true);
        expect(latestBlocks.length).toEqual(0);

        done();
    });
});

