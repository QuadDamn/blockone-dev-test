import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';

export default function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <HomeContainer />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}
