import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SubView from './SubView';

class App extends Component {

  static propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    count: React.PropTypes.number
  };

  static defaultProps = {
    title: '',
    description: '',
    count: 0
  };


  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.title !== nextProps.title ||
      this.props.description !== nextProps.description ||
      this.props.count !== nextProps.count
    );
  }

  render() {
    console.log('AppView render()')
    const {sendEvent, ...props} = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to {props.title}</h2>
        </div>
        <p className="App-intro">
          {props.description}
        </p>
        <p>
          <a href="https://github.com/soenkekluth/pmvc">https://github.com/soenkekluth/pmvc</a>
        </p>

        <p>
          <button onClick={props.onClickButton}>Click me</button>
        </p>
        <div>clicked {props.count}</div>
        <br/>
        <SubView sendEvent={sendEvent} ref="subview"/>

      </div>
    );
  }
}

export default App;
