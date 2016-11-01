import PMVCComponent from './PMVCComponent';
import assign from 'object-assign';
import { applyDecorators, decorate, autobind, mixin, extendDescriptor, override, configurable } from 'core-decorators';

const viewDecorators = {


  // create(func){
  //   console.log(func);
  //   return Reflect.apply(func, {}, {});
  // },

  componentWillMount(func) {
    console.log('componentWillMount', func);
    return (() => {
      this.tryRegisterMediator();
      func.call(this)
    })();
  },

  componentDidMount(func) {
    return (() => {
      this.tryRegisterMediator();
      func.call(this)
    })();
  }
}


const connectView = (TargetClass, mapStateToProps, MediatorClass) => {


  // console.log(TargetClass.prototype.constructor)

  // TargetClass.prototype.constructor = 'function(){console.log("huhu")}';


  // return TargetClass;

  const { prototype } = TargetClass;
  const propsToInherit = ['componentWillMount', 'componentDidMount'];
  const propsToDecorate = [];

  for (let i = 0, l = propsToInherit.length; i < l; i++) {
    const a = propsToInherit[i];
    if (Object.hasOwnProperty.call(prototype, a)) {
      propsToDecorate.push(a);
    }
  }


  if (propsToDecorate.length) {
    const decorators = {};
    for (let i = 0, l = propsToDecorate.length; i < l; i++) {
      const b = propsToDecorate[i];
      decorators[b] = [autobind, decorate(viewDecorators[b])];
    }

    // decorators['constructor'] = [decorate(viewDecorators.create)]

    applyDecorators(TargetClass, decorators);
  }


  // TargetClass.prototype.constructor = Reflect.apply(TargetClass, {}, {});

  // TargetClass.prototype = assign(TargetClass.prototype, Object.create(PMVCComponent.prototype));
  // console.log(TargetClass);


  prototype['mapStateToProps'] = mapStateToProps;

  TargetClass.propTypes = assign({}, TargetClass.propTypes, PMVCComponent.propTypes);
  TargetClass.contextTypes = assign({}, TargetClass.contextTypes, PMVCComponent.contextTypes);
  if(MediatorClass){
    TargetClass.defaultProps = assign({}, TargetClass.defaultProps, {Mediator: MediatorClass});
  }

  mixin(PMVCComponent.prototype)(TargetClass);


  return TargetClass;
}

export default connectView;
