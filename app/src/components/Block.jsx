import React from 'react';
import PropTypes from 'prop-types';

const Block = ({id, timestamp, actionsCount, rawJson}) => (
    <div className="card mt-3">
        <div className="card-header" id={`heading-${id}`} data-toggle="collapse" data-target={`#collapse-${id}`}
             aria-expanded="true" aria-controls="collapse-{{id}}">
            <p className="mb-0"><span className="font-weight-bold">ID:</span> {id}</p>
            <p className="mb-0"><span className="font-weight-bold">Timestamp:</span> {timestamp}</p>
            <p className="mb-0"><span className="font-weight-bold"># of Actions:</span> {actionsCount}
            </p>
        </div>

        <div id={`collapse-${id}`} className="collapse" aria-labelledby={`heading-${id}`}
             data-parent="#latestBlocksAccordion">
            <div className="card-body">
                <p><span className="font-weight-bold">Raw JSON:</span></p>
                <pre className="pre-scrollable"
                     style={{border: "1px lightgray solid", padding: "10px"}}><code>{rawJson}</code></pre>
            </div>
        </div>
    </div>
);

Block.propTypes = {
    block: PropTypes.shape({
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
        actionsCount: PropTypes.number.isRequired,
        rawJson: PropTypes.string.isRequired
    })
};

export default Block;