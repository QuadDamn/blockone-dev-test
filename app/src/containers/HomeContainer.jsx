import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LatestBlocks from '../components/LatestBlocks';

const HomeContainer = () => {
    const [latestBlocks, setLatestBlocks] = useState([]);

    useEffect(async () => {
        try {
            await getLatestBlocks();
        } catch (err) {
            // Error notification was already done in `getLatestBlocks` function
            // due to the use of the function here and the onClick event on the Load button.
            console.log(err);
        }
    }, []);

    async function getLatestBlocks() {
        try {
            // Forces a re-render to get the Loading prompt to come back to let the user know
            // that we are waiting for the next result set.
            setLatestBlocks([]);
            // API base URL should be moved out to a environment variable, but tried to keep things simple
            // for getting the program to run on your end.
            const result = await axios.get('http://localhost:5001/blocks/latest');
            setLatestBlocks(result.data.latestBlocks);
        } catch (err) {
            setTimeout(() => {
                alert('There was an issue loading the latest blocks from the blockchain.  Please try again.');
            }, 3000);
        }
    }

    return (
        <div className="container">
            <div className="latest-blocks-container">
                <h1>
                    <span>Block.one Developer Test</span>
                    <button className='btn btn-primary float-right' onClick={() => getLatestBlocks()}>Load Latest Blocks
                    </button>
                </h1>

                {latestBlocks.length > 0
                    ?
                    <div className="accordion" id="latestBlocksAccordion">
                        <LatestBlocks blocks={latestBlocks} />
                    </div>
                    : <div>Loading Latest Blocks...</div>
                }
            </div>
        </div>
    );
};

export default HomeContainer;