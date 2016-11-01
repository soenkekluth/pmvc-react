import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SubView from './SubView';
import {EventNames} from '../constants/AppConstants'
import connect from '../core/view/connect';

class App extends Component {

  static propTypes = {
    appInfo: React.PropTypes.object,
    counterGlobal: React.PropTypes.number
  };


  onClick(){
    const dispatch = this.props.dispatch;
    dispatch(EventNames.CLICK_GLOBAL_COUNT);
  }

  render() {
    const {appInfo, counterGlobal} = this.props;

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
          <a href="https://github.com/soenkekluth/pmvc">https://github.com/soenkekluth/pmvc</a>
        </p>

        <p>
          <button onClick={this.onClick.bind(this)}>Click me</button>
        </p>
        <div>clicked {counterGlobal}</div>
        <br/>

        <SubView />

      </div>
    );
  }
}


function mapStateToProps(state){

  return {
    appInfo: state.app,
    counterGlobal: state.counterGlobal.count
  }
}

export default connect(mapStateToProps)(App);

