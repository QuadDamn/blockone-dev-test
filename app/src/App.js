import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import {fetchLatestBlocks} from './api';


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/">
                        <HomeContainer fetchLatestBlocks={fetchLatestBlocks}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
