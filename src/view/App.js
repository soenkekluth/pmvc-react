import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SubView from './SubView';
import {connect} from '../core/PMVCView';


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


  // shouldComponentUpdate (nextProps, nextState) {
  //   console.log('App shouldComponentUpdate', nextProps, nextState);
  //   return false;
  //   // return (
  //   //   this.props.title !== nextProps.title ||
  //   //   this.props.description !== nextProps.description ||
  //   //   this.props.count !== nextProps.count
  //   // );
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log('App componentWillReceiveProps',nextProps);
  //   // return nextProps;
  // }

  // // // @decorate(PMVCView.prototype. componentDidUpdate)
  // // // @decorate(PMVCView.componentDidUpdate)
  // componentDidUpdate(){
  //   console.log('App componentDidUpdate')
  //   // alert('hans');
  //   // super.componentDidUpdate();
  // }


  // componentDidMount() {
  //   console.log('App componentDidMount');
  //   return true;
  // }


  mapStateToProps(state){
    console.log('App mapStateToProps')
    return {
      appInfo: state.app,
      counterGlobal: state.counterGlobal
    }
  }


  render() {
    console.log('App render()', this.props)
    const sendEvent = this.props.sendEvent || this.context.sendEvent;
    //onClick={sendEvent.bind(this, EventNames.APP_CLICK_GLOBAL_COUNT)}
    // const sendEvent = super.sendEvent;
    // const count = this.props.count || Math.random()*100;
    const count = this.props.count ;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to {this.props.title}</h2>
        </div>
        <p className="App-intro">
          {this.props.description}
        </p>
        <p>
          <a href="https://github.com/soenkekluth/pmvc">https://github.com/soenkekluth/pmvc</a>
        </p>

        <p>
          <button>Click me</button>
        </p>
        <div>clicked {count}</div>
        <br/>

          <SubView ref="subview"/>

      </div>
    );
  }
}

export default connect(App);

// console.log(App);

//  applyDecorators(App,{
//   // componentDidMount:[decorate],
//   componentDidUpdate:[decorate(PMVCView)],
//   // shouldComponentUpdate:[configurable],
//   // shouldComponentUpdate:[decorate],
//   // componentDidMount:[decorate],
//   // componentWillReceiveProps:[override, decorate],
//   // componentWillMount:[decorate]
//   // render:[decorate],
// });

 // export default App;



// export default applyDecorators(PMVCView.__proto__,{
//   // componentDidMount:[decorate],
//   // componentDidUpdate:[decorate],
//   // shouldComponentUpdate:[decorate],
//   // componentWillReceiveProps:[decorate],
//   // componentWillMount:[decorate]
//   // render:[decorate],
// });
//
//
// export default App;
