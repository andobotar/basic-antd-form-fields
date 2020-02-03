import React from 'react';
import BasicForm from './components/BasicForm';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Navbar from './components/Navbar';
import DateTimePickers from './components/DateTimePickers';
import ExtraFields from './components/ExtraFields';

const App: React.FC = () => {
  return (
      <div>
          <Navbar />
          <div className="content">
              <Switch>
                  <Route path="/basic" component={BasicForm} />
                  <Route path="/datetime" component={DateTimePickers} />
                  <Route path="/extra" component={ExtraFields} />
              </Switch>
          </div>
      </div>
  );
}

export default App;
