const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const fetch = require('node-fetch');
const { JsonRpc, RpcError } = require('eosjs');

app.use(cors());

router.get('/blocks/latest', async (req, res) => {
    // Typically would move out the API endpoint to an .env variable,
    // but kept it here for ease of running the program on your end.
    const rpc = new JsonRpc('https://api.eosnewyork.io', { fetch });

    try {
        const blockchainInfo = await rpc.get_info();
        const blocksArray = await getLatestBlocks(rpc, blockchainInfo.head_block_num);
        return res.status(200).json({latestBlocks: blocksArray});
    } catch (err) {
        console.log('\nCaught exception: ' + err);
        if (err instanceof RpcError) {
            console.log(JSON.stringify(err.json, null, 2));
        }

        return res.status(err.json.code).json({});
    }
});

app.use('/', router);

app.listen(5000, () => {
    console.log('App listening on port 5000');
});

/**
 * Will get the latest blocks from the blockchain.  The amount of blocks is dependent on
 * the numberOfBlocksToFetch argument and will fetch up to that many blocks (assuming that
 * the chain is not brand new or something of that sort).
 *
 * @param rpc
 * @param startingBlock
 * @param numberOfBlocksToFetch
 * @returns {Promise<[]>}
 */
async function getLatestBlocks(rpc, startingBlock, numberOfBlocksToFetch = 10) {
    const blocksArray = [];
    let blockToFetch = startingBlock;

    while (numberOfBlocksToFetch !== 0) {
        try {
            // In the event that numbersOfBlocksToFetch is greater than the number of the blocks in the blockchain,
            // break the loop and return the blocks that we have gathered thus far.
            if (!blockToFetch) break;

            const blockInfo = await rpc.get_block(blockToFetch);
            blocksArray.push({
                id: blockInfo.id,
                timestamp: blockInfo.timestamp,
                transactionsCount: blockInfo.transactions.length,
                rawJson: JSON.stringify(blockInfo, undefined, 2),
            });

            // The previous block (if it exists) now becomes the current block to continue the loop
            // backwards to find the rest of the latest blocks.
            blockToFetch = ("previous" in blockInfo) ? blockInfo : '';

            numberOfBlocksToFetch--;
        } catch (err) {
            throw err;
        }
    }

    return blocksArray;
}
