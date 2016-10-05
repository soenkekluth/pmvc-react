import React, { Component } from 'react';
import AppFacade from '../facade/app-facade';

class PMVCView extends Component {

  static propTypes = {
    Mediator: React.PropTypes.any,
    name: React.PropTypes.string
  };

  static defaultProps = {
    Mediator: null,
    name: ''
  };


  constructor(props, context) {
    super(props, context);

    if (this.__proto__.constructor !== PMVCView) {
      this.registerMediator(this);
    }
  }

  componentDidMount() {
    if (this.refs.element) {
      this.registerMediator(this.refs.element);
    }
  }

  registerMediator(view) {
    if (this.props.Mediator) {
      const name = this.props.name || this.props.Mediator.NAME;
      if (!AppFacade.getInstance('app').retrieveMediator(name)) {
        AppFacade.getInstance('app').registerMediator(new this.props.Mediator(name, view));
      }
    }
  }


  render() {
    if (this.props.children) {
      let element = React.Children.only(this.props.children);
      element = React.cloneElement(element, { ref: 'element' , ...element.props });
      return element;
    }
  }

}

export default PMVCView;
