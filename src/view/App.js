import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

    const data = this.props.data;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to {data.title}</h2>
        </div>
        <p className="App-intro">
          {data.description}
        </p>
        <p>
          <a href="https://github.com/soenkekluth/pmvc">https://github.com/soenkekluth/pmvc</a>
        </p>
      </div>
    );
  }
}

export default App;
