import React, { Component } from 'react';
import storeShape from '../utils/storeShape'

export default class Provider extends Component {

  static propTypes = {
    store: storeShape.isRequired,
    children: React.PropTypes.element.isRequired
  };

  static childContextTypes = {
    store: storeShape.isRequired
  };


  constructor(props, context) {
    super(props, context)
    this.store = props.store;
  }

  getChildContext() {
    return {
      store : this.store
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
