import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SubView from './SubView';
import MainView from './MainView';
import connect from '../core/view/connect';

class App extends Component {

  static propTypes = {
    appInfo: React.PropTypes.object
  };

  render() {
    const {appInfo} = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to {appInfo.title}</h2>
        </div>
        <p className="App-intro">
          {appInfo.description}
        </p>
        <p>
          <a href="https://github.com/soenkekluth/pmvc-react">https://github.com/soenkekluth/pmvc-react</a>
        </p>
        <p>
          <a href="https://github.com/soenkekluth/pmvc">https://github.com/soenkekluth/pmvc</a>
        </p>

        <MainView />

        <br/>

        <SubView />

      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    appInfo: state.app
  }
}

export default connect(mapStateToProps)(App);

