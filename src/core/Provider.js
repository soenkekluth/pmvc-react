import React, { Component } from 'react';
export default class Provider extends Component {

  static propTypes = {
    facade: React.PropTypes.object,
    store: React.PropTypes.object,
    children: React.PropTypes.element.isRequired
  };

  static childContextTypes = {
    facade: React.PropTypes.object,
    store: React.PropTypes.object,
    sendEvent: React.PropTypes.func
  };


  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  getChildContext() {
    return {
      facade: this.props.facade,
      sendEvent: this.props.facade.sendEvent.bind(this.props.facade)
    };
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
