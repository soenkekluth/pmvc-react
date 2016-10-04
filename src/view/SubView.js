import React, { Component } from 'react';

class SubView extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      count : 0
    }
  }
  onClick(){

    this.props.sendEvent('SUBVIEW_COUNT');

  }
  render() {

    return (
      <div>Subview
        <div>count {this.state.count}</div>
        <p>
          <button onClick={this.onClick.bind(this)}>Click me</button>
        </p>
      </div>
    );
  }
}

export default SubView;
