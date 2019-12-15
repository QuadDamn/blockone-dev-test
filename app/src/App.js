import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LatestBlocksContainer from './containers/LatestBlocksContainer';
import {fetchLatestBlocks} from './api';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/">
                        <LatestBlocksContainer fetchLatestBlocks={fetchLatestBlocks}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
