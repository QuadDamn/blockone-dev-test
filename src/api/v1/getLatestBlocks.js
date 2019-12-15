const {RpcError} = require('eosjs');
const ChainAPI = require('../../classes/ChainAPI');

async function getLatestBlocks(req, res) {
    try {
        const numberOfBlocksToFetch = req.params.numberOfBlocks;

        const chainAPIInstance = new ChainAPI();
        const blockchainInfo = await chainAPIInstance.getInfo();

        console.log(blockchainInfo);

        const blocksArray = await chainAPIInstance.getLatestBlocks(blockchainInfo.head_block_num, numberOfBlocksToFetch);

        return res.status(200).json({latestBlocks: blocksArray});
    } catch (err) {
        console.log('\nCaught exception: ' + err);
        if (err instanceof RpcError) {
            console.log(JSON.stringify(err.json, null, 2));
            return res.status(err.json.code).json({});
        }

        return res.status(err.code).json({});
    }
}

module.exports = getLatestBlocks;