import React, { Component } from 'react';
import { EventNames } from '../constants';
import SubSubView from './SubSubView';
import SubSubViewMediator from './SubSubViewMediator';

class SubView extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      counterGlobal: 0,
      counterLocal: 0
    };
  }

  onClickGlobal() {
    // this.props.sendEvent(EventNames.SUBVIEW_GLOBAL_COUNT);
  }

  onClickLocal() {
    // this.props.sendEvent(EventNames.SUBVIEW_LOCAL_COUNT);
  }

  render() {
    return (
      <div>
        <h1>Subview</h1>
        <p>global clicked {this.state.counterGlobal}</p>
        <p>local clicked {this.state.counterLocal}</p>
        <p>
          <button onClick={this.onClickGlobal.bind(this)}>click global</button>
          <button onClick={this.onClickLocal.bind(this)}>click local</button>
        </p>


          <SubSubView Mediator={SubSubViewMediator} />
       </div>
    );
  }
}

export default SubView;
