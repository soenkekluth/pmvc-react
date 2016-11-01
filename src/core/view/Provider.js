import React, { Component } from 'react';
import storeShape from '../utils/storeShape'
import assign from 'object-assign';

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
    this.store = props.store
    // this.handleChange = this.handleChange.bind(this);
    // this.sendEvent = this.store.sendEvent.bind(this.store);
  }

  getChildContext() {
    return {
      store : this.store
    };
  }

  // handleChange(){
  //   this.forceUpdate();
  // }

  render() {
    return React.Children.only(this.props.children);
    // const child = React.Children.only(this.props.children);

    // if(!child.type.prototype.handleChange){
    //  child.type.prototype.handleChange = this.handleChange;
    // }
    // const mapStateToProps = child.type.prototype.mapStateToProps;
    // if(mapStateToProps){
    //   const props = assign({}, child.props, mapStateToProps(this.store.getState()), {sendEvent:this.sendEvent});
    //   return React.cloneElement(child , { ...props });
    // }

    // return child;
  }
}
