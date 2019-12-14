import React from 'react';
import Markdown from 'react-markdown-it';

const LatestBlocks = ({blocks}) => (
    blocks.map((block) => (
        <div className="card mt-3" key={block.id}>
            <div className="card-header" id={`heading-${block.id}`} data-toggle="collapse" data-target={`#collapse-${block.id}`}
                 aria-expanded="true" aria-controls="collapse-{{id}}">
                <p className="mb-0"><span className="font-weight-bold">ID:</span>{block.id}</p>
                <p className="mb-0"><span className="font-weight-bold">Timestamp:</span> {block.timestamp}</p>
                <p className="mb-0"><span className="font-weight-bold"># of Actions:</span> {block.actionsCount}
                </p>
            </div>

            <div id={`collapse-${block.id}`} className="collapse" aria-labelledby={`heading-${block.id}`}
                 data-parent="#latestBlocksAccordion">
                <div className="card-body">
                    <p><span className="font-weight-bold">Raw JSON:</span></p>
                    <pre className="pre-scrollable" style={{border: "1px lightgray solid", padding: "10px"}}><code>{block.rawJson}</code></pre>
                </div>
            </div>
        </div>
    ))
);

export default LatestBlocks;