import React, {useState, useCallback} from 'react';
import Block from '../components/Block';
import PropTypes from 'prop-types';

const DEFAULT_ERROR_MESSAGE = 'There was an issue getting the latest blocks from the blockchain.  Press the \'Load Latest Blocks\' to try again.';

const LatestBlocksContainer = ({fetchLatestBlocks}) => {
    const [latestBlocks, setLatestBlocks] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    // Had to end up using React.useEffect instead of the destructured useEffect
    // because the Jest spyOn would not work otherwise.
    React.useEffect(() => {
        fetchLatestBlocks().then((response) => {
            setErrorMessage('');
            setLatestBlocks(response.data.latestBlocks);
        }).catch((err) => {
            console.log(err);
            setErrorMessage(DEFAULT_ERROR_MESSAGE);
        });
    }, [fetchLatestBlocks]);

    const refreshLatestBlocks = useCallback(async () => {
        // Don't want to send another request while we are already refreshing the data.
        if (isRefreshing) return;

        setErrorMessage('');
        setLatestBlocks([]);
        setIsRefreshing(true);

        try {
            const response = await fetchLatestBlocks();
            setLatestBlocks(response.data.latestBlocks);
            setIsRefreshing(false);
        } catch (err) {
            console.log(err);
            setErrorMessage(DEFAULT_ERROR_MESSAGE);
            setIsRefreshing(false);
        }
    }, [fetchLatestBlocks, isRefreshing]);

    console.log(latestBlocks);

    return (
        <div className="container">
            <div className="latest-blocks-container">
                <h1>
                    <span>Block.one Developer Test</span>
                    <button className='btn btn-primary float-right' disabled={isRefreshing}
                            onClick={refreshLatestBlocks}>Load Latest Blocks
                    </button>
                </h1>

                {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}

                {!errorMessage && latestBlocks.length === 0 ? <div>Loading Latest Blocks...</div> : ''}

                {latestBlocks.length > 0
                    ?
                    <div className="accordion" id="latestBlocksAccordion">
                        {latestBlocks.map((block) => (
                            <Block key={block.id} {...block}/>
                        ))}
                    </div>
                    : ''}
            </div>
        </div>
    );
};

LatestBlocksContainer.propTypes = {
    fetchLatestBlocks: PropTypes.func.isRequired
};

export default LatestBlocksContainer;