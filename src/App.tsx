import React from 'react';
import BasicForm from './components/BasicForm';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Navbar from './components/Navbar';
import DateTimePickers from './components/DateTimePickers';
import ExtraFields from './components/ExtraFields';
import Transfer from './components/Transfer';

const App: React.FC = () => {
  return (
      <div>
          <Navbar />
          <div className="content">
              <Switch>
                  <Route path="/basic" component={BasicForm} />
                  <Route path="/datetime" component={DateTimePickers} />
                  <Route path="/extra" component={ExtraFields} />
                  <Route path="/transfer" component={Transfer} />
              </Switch>
          </div>
      </div>
  );
}

export default App;
