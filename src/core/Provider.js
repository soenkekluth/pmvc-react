import React, { Component } from 'react';
export default class Provider extends Component {
  getChildContext() {
    return {
      facade: this.props.facade
    }
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  facade: React.PropTypes.object
};
