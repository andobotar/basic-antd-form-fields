import React from 'react';
import BasicForm from './components/BasicForm';

import './App.scss';

const App: React.FC = () => {
  return (
      <div>
          <div className="content">
              <BasicForm />
          </div>
      </div>
  );
}

export default App;
