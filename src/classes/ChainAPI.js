const fetch = require('node-fetch');
const {JsonRpc} = require('eosjs');

/**
 * Class that works via the EOSJS library with the Chain API from the EOSIO blockchain (https://developers.eos.io/eosio-nodeos).
 */
class ChainAPI {
    constructor() {
        // Typically would move out the API endpoint to an .env variable,
        // but kept it here for ease of running the program on your end.
        this.rpc = new JsonRpc('https://api.eosnewyork.io', {fetch});
    }

    /**
     * Getting various details about the blockchain.
     *
     * API Reference: https://developers.eos.io/eosio-nodeos/reference#get_info-1
     *
     * @returns {Promise<GetInfoResult>}
     */
    async getInfo() {
        try {
            return await this.rpc.get_info();
        } catch (err) {
            throw err;
        }
    }

    /**
     * Will get the latest blocks from the blockchain.  The amount of blocks is dependent on
     * the numberOfBlocksToFetch argument and will fetch up to that many blocks (assuming that
     * the chain is not brand new or something of that sort).
     *
     * API Reference: https://developers.eos.io/eosio-nodeos/reference#get_block-1
     *
     * @param startingBlock
     * @param numberOfBlocksToFetch
     * @returns {Promise<[]>}
     */
    async getLatestBlocks(startingBlock, numberOfBlocksToFetch) {
        const blocksArray = [];
        let blockToFetch = startingBlock;
        let totalActionsPerBlock = 0;

        while (numberOfBlocksToFetch > 0) {
            try {
                // Resetting this back to zero to start the count of actions for the next block.
                totalActionsPerBlock = 0;

                // In the event that numbersOfBlocksToFetch is greater than the number of the blocks in the blockchain,
                // break the loop and return the blocks that we have gathered thus far.
                if (!blockToFetch) break;

                const blockInfo = await this.rpc.get_block(blockToFetch);

                // Tally all of the actions for each transaction for the entire block.
                for (let i = 0; i < blockInfo.transactions.length; i++) {

                    // The 'trx' could be a string in some cases, which means that there is not going to be
                    // a transaction log with all of the actions.  We want to ignore those cases.
                    if (typeof blockInfo.transactions[i].trx !== 'string' &&
                        blockInfo.transactions[i].trx.hasOwnProperty('transaction') &&
                        blockInfo.transactions[i].trx.transaction.hasOwnProperty('actions')
                    ) {
                        totalActionsPerBlock += blockInfo.transactions[i].trx.transaction.actions.length;
                    }
                }

                blocksArray.push({
                    id: blockInfo.id,
                    timestamp: blockInfo.timestamp,
                    actionsCount: totalActionsPerBlock,
                    rawJson: JSON.stringify(blockInfo, undefined, 2),
                });

                // The previous block (if it exists and is not empty) now becomes the current block to continue the loop
                // backwards to find the rest of the latest blocks.
                blockToFetch = (blockInfo.hasOwnProperty('previous') && blockInfo.previous !== '') ? blockInfo.previous : '';
                numberOfBlocksToFetch--;
            } catch (err) {
                throw err;
            }
        }

        return blocksArray;
    }
}

module.exports = ChainAPI;