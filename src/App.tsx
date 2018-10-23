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
            canvasWidth={800}
            canvasHeight={600}
          />
        </div>
      </div>
    );
  }
}

export default App;
