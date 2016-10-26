import React, { Component, createElement } from 'react';
import { delegateProxy, decorateFunction, inheritProps } from '../utils/delegate';
import assign from 'object-assign';

import { applyDecorators, decorate, autobind, extendDescriptor, override, configurable } from 'core-decorators';


class PMVComponentDecorator extends Component {

  mediator = null;

  nextProps = {};

  static propTypes = {
    Mediator: React.PropTypes.any,
    mediatorName: React.PropTypes.string,
    facade: React.PropTypes.object,
    state: React.PropTypes.object
  };

  static contextTypes = {
    facade: React.PropTypes.object,
    sendEvent: React.PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    console.log('PMVComponentDecorator ficken')
    this.nextProps = assign({}, this.props);
    this.tryRegisterMediator();
  }


  tryRegisterMediator() {
    let mediator = this.mediator;

    if (mediator || (!this.props.Mediator && !this.props.mediatorName)) {
      return;
    }

    const facade = this.context.facade || this.props.facade;

    if (this.props.Mediator) {
      const name = this.props.mediatorName || this.props.Mediator.NAME;
      mediator = facade.getMediator(name);
      if (!mediator) {
        mediator = new this.props.Mediator(name, this);
        facade.addMediator(mediator);
      } else {
        mediator.setViewComponent(this);
      }
    } else if (this.props.mediatorName) {
      mediator = facade.getMediator(this.props.mediatorName);
      if (mediator) {
        mediator.setViewComponent(this);
      }
    }

    this.mediator = mediator;
  }

  sendEvent(name, body, type) {
    if (this.mediator && this.mediator.sendEvent) {
      this.mediator.sendEvent.apply(this.mediator, arguments);
    } else {
      const facade = this.context.facade || this.props.facade;
      facade.sendEvent(name, body, type);
    }
  }

  componentWillMount() {
    console.log('PMVComponentDecorator componentWillMount')
    this.tryRegisterMediator();
  }

  // @configurable
  componentWillReceiveProps(nextProps) {
    const facade = this.context.facade || this.props.facade;
    nextProps = this.nextProps = this.mapStateToProps(facade.state);
    console.log('PMVComponentDecorator componentWillReceiveProps', this.nextProps);
    return this.nextProps; // = this.nextProps = {hans:'wurst'};

  }


  // mapStateToProps(state) {
  //   return {...state };
  // }

  shouldComponentUpdate(nextProps, nextState) {
    nextProps = this.nextProps;
    console.log('PMVComponentDecorator shouldComponentUpdate', nextProps, nextState);
    // this.nextProps = assign({}, this.nextProps, nextProps);
    return true;
  }

  componentDidUpdate(){
    console.log('PMVComponentDecorator componentDidUpdate');

    // return true;
  }
  // componentDidMount(){}
  // componentWillMount(){}
  // shouldComponentUpdate(nextProps, nextState){
  //   return true;
  // }
  // componentWillReceiveProps(nextProps){
  //   console.log(nextProps);
  // }


  // render(){
  //   if(this.props.children){
  //     return React.Children.only(this.props.children);
  //   }else{
  //     return null;
  //   }
  // }
}

class PMVComponent extends Component {

  // componentDidMount() {
  //   console.log('fuck');
  // }
  //
  //
  Origin = PMVComponent;

  componentDidUpdate(){
    console.log('PMVComponent componentDidUpdate');
  }


  hans(props, context) {
    console.log(props, context);
  }

  constructor(props, context) {
    super(props, context);

    // constructor(props, context){
    // super(props, context);
    // console.log('PMVComponentDecorator ficken')
    // this.nextProps = assign({}, this.props);
    // this.tryRegisterMediator();
    // }

    // decorateFunction(this.__proto__.constructor, ['render', 'componentDidUpdate', 'componentWillMount', 'componentWillReceiveProps', 'shouldComponentUpdate']);
    // inheritProps(this.__proto__.constructor);

    // this.nextProps = assign({}, this.props);
    // this.tryRegisterMediator();
    // this.Origin = this.__proto__.constructor;
    // console.log(this.__proto__.constructor.prototype);
    // console.log(PMVComponent.prototype.componentWillReceiveProps);
    //   applyDecorators(this.__proto__.constructor,{
    //   // componentDidUpdate:[autobind, decorate(PMVComponent.prototype.componentDidUpdate)],
    //   // shouldComponentUpdate:[override],
    //   // componentDidMount:[decorate],
    //   // componentWillReceiveProps:[decorate(PMVComponent.prototype.componentWillReceiveProps.bind(this))],
    //   shouldComponentUpdate:[autobind, decorate(PMVComponentDecorator.prototype.shouldComponentUpdate)],
    //   // componentWillMount:[decorate],
    //   render:[autobind, decorate(PMVComponent.prototype.render)],
    // });

    console.log('PMVComponent ficken')
  }

  // render(){
  //     applyDecorators(this.__proto__.constructor,{
  //     // componentDidUpdate:[autobind, decorate(PMVComponent.prototype.componentDidUpdate)],
  //     // shouldComponentUpdate:[override],
  //     // componentDidMount:[decorate],
  //     // componentWillReceiveProps:[decorate(PMVComponent.prototype.componentWillReceiveProps.bind(this))],
  //     shouldComponentUpdate:[decorate(PMVComponent.prototype.shouldComponentUpdate)],
  //     // componentWillMount:[decorate],
  //     render:[decorate(PMVComponent.prototype.render)],
  //   });

  //     return true;
  // }

  mediator = null;

  nextProps = {};

  static propTypes = {
    Mediator: React.PropTypes.any,
    mediatorName: React.PropTypes.string,
    facade: React.PropTypes.object,
    state: React.PropTypes.object
  };

  static contextTypes = {
    facade: React.PropTypes.object,
    sendEvent: React.PropTypes.func
  };



  tryRegisterMediator() {
    let mediator = this.mediator;

    if (mediator || (!this.props.Mediator && !this.props.mediatorName)) {
      return;
    }

    const facade = this.context.facade || this.props.facade;

    if (this.props.Mediator) {
      const name = this.props.mediatorName || this.props.Mediator.NAME;
      mediator = facade.getMediator(name);
      if (!mediator) {
        mediator = new this.props.Mediator(name, this);
        facade.addMediator(mediator);
      } else {
        mediator.setViewComponent(this);
      }
    } else if (this.props.mediatorName) {
      mediator = facade.getMediator(this.props.mediatorName);
      if (mediator) {
        mediator.setViewComponent(this);
      }
    }

    this.mediator = mediator;
  }

  sendEvent(name, body, type) {
    if (this.mediator && this.mediator.sendEvent) {
      this.mediator.sendEvent.apply(this.mediator, arguments);
    } else {
      const facade = this.context.facade || this.props.facade;
      facade.sendEvent(name, body, type);
    }
  }

  componentWillMount() {

    console.log('PMVComponent componentWillMount')
    this.tryRegisterMediator();
  }

  componentDidMount() {

    console.log('PMVComponent componentDidMount')
    return true;
    // this.tryRegisterMediator();
  }

  // @configurable
  componentWillReceiveProps(nextProps) {
    const facade = this.context.facade || this.props.facade;
    nextProps = this.nextProps = this.mapStateToProps(facade.state);
    console.log('PMVComponent componentWillReceiveProps', this.nextProps);

    // return this.nextProps; // = this.nextProps = {hans:'wurst'};

  }


  // mapStateToProps(state) {
  //   return {...state };
  // }

  shouldComponentUpdate(nextProps, nextState) {
    nextProps = this.nextProps;
    console.log('PMVComponent shouldComponentUpdate', nextProps, nextState);
    // this.nextProps = assign({}, this.nextProps, nextProps);
    return true;
  }



  // render() {
  //   console.log('PMVComponent render()',this.props.children)
  //       return null;
  //     if (this.props.children) {
  //       return React.Children.only(this.props.children);
  //     } else {
  //       return null;
  //     }

  //   }
    // delegateProxy(this.__proto__, PMVComponentDecorator);
    // delegateProxy(PMVComponentDecorator.prototype, this.prototype);
    // delegateProxy(PMVComponent.prototype, this );
    // console.log(this.__proto__)
    // console.log(this.__proto__.constructor)


  // @decorate(PMVComponentDecorator.prototype.componentDidUpdate)
  // componentDidUpdate(){
  //   console.log('PMVComponent componentDidUpdate');
  // }
}

// export default  applyDecorators(PMVComponent,{
//   // componentDidUpdate:[autobind, decorate(PMVComponent.prototype.componentDidUpdate)],
//   // shouldComponentUpdate:[override],
//   // componentDidMount:[decorate],
//   // componentWillReceiveProps:[decorate(PMVComponent.prototype.componentWillReceiveProps.bind(this))],
//   shouldComponentUpdate:[decorate(PMVComponent.prototype.shouldComponentUpdate)],
//   // componentWillMount:[decorate],
//   // render:[decorate(PMVComponent.prototype.render)],
// });

// console.log(s);
export const connect = (ComponentClass) => {

  // ComponentClass = ComponentClass extends PMVComponent;
  console.log(ComponentClass);
  console.log(ComponentClass.prototype);

  const decorators = {};


  applyDecorators(ComponentClass,{
    // constructor: [decorate(PMVComponent.__proto__.constructor)],
    // componentDidUpdate:[autobind, decorate(PMVComponent.prototype.componentDidUpdate)],
    // shouldComponentUpdate:[override],
    // componentDidMount:[autobind, decorate(PMVComponent.prototype.componentDidMount)],
    // componentWillReceiveProps:[decorate(PMVComponent.prototype.componentWillReceiveProps.bind(this))],
    // shouldComponentUpdate:[autobind, decorate(PMVComponent.prototype.shouldComponentUpdate)],
    // componentWillMount:[decorate],
    // render:[decorate(PMVComponent.prototype.render)],
  });
  return ComponentClass;
}

export default PMVComponent;






// applyDecorators(PMVComponent.__proto__.constructor,{
// applyDecorators(PMVComponent.__proto__,{
// applyDecorators(PMVComponent,{
//   componentDidUpdate:[decorate],
//   shouldComponentUpdate:[override],
//   componentDidMount:[decorate],
//   componentWillReceiveProps:[override, decorate],
//   componentWillMount:[decorate],
//   // render:[decorate],
// });


// export default delegateProxy(PMVComponent, PMVComponent.__proto__);
// export default delegateProxy(PMVComponent.__proto__, PMVComponent);
// export default delegateProxy(PMVComponent.__proto__, PMVComponentDecorator);



// export default applyDecorators(PMVComponent.__proto__,{
//   componentDidUpdate:[decorate(PMVComponentDecorator.prototype.componentDidUpdate)]
// });
// decorateFunction(PMVComponent, ['componentDidUpdate'])
// export default ((ex) => {

//   console.log(ex)
//   console.log(ex(PMVComponent))
//   // console.log(a.__proto__)
//   // return a(new PMVComponent);

// })(module.exports);
// decorateFunction(PMVComponent, ['componentDidUpdate'])
// export default delegateProxy(PMVComponent, PMVComponent.__proto__);
// export default delegateProxy(PMVComponent.__proto__, applyDecorators(PMVComponent,{
//   componentDidUpdate:[decorate(PMVComponentDecorator.componentDidUpdate)]
// }));

// export default (function(){
//   var Clazz = PMVComponent.__proto__.constructor;
//   console.dir(PMVComponent.__proto__)
//   console.dir(PMVComponent.__proto__.constructor)

//   return PMVComponent;

// })()



// export default applyDecorators(PMVComponent.__proto__,{
//   // componentDidMount:[decorate],
//   // componentDidUpdate:[decorate],
//   // shouldComponentUpdate:[decorate],
//   // componentWillReceiveProps:[decorate],
//   // componentWillMount:[decorate]
//   // render:[decorate],
// });




// applyDecorators(App,{
//   propTypes:[extendDescriptor]
// });
