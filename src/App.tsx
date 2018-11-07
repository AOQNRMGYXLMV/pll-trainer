import * as React from 'react';
import './App.css';
import { RubicCanvas } from './components/RubicCanvas';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <RubicCanvas
            pllIndex={0}
            cubeLength={200}
          />
        </div>
      </div>
    );
  }
}

export default App;
