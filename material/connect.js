import PMVCView from './PMVCView';
import assign from 'object-assign';
import { memoize } from 'lodash';
import { applyDecorators, decorate, autobind, mixin, extendDescriptor, override, configurable } from 'core-decorators';


const connect = (TargetClass, mapStateToProps) => {

  const { prototype } = TargetClass;
  const propsToInherit = ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate'];
  const propsToDecorate = [];

  for (let i = 0, l = propsToInherit.length; i < l; i++) {
    const func = propsToInherit[i];
    if(prototype[func]){
      propsToDecorate.push(func);
    }
  }

  if(propsToDecorate.length) {
    const decorators = {};
    // decorators['componentWillReceiveProps'] =
    for (let i = 0, l = propsToDecorate.length; i < l; i++) {
      const func = propsToDecorate[i];
      decorators[func] = [autobind, decorate(PMVCView.prototype[func])];
    }

    applyDecorators(TargetClass, decorators);
  }


  // // TargetClass.propTypes = assign({},TargetClass.propTypes, PMVCView.propTypes);
  // TargetClass.contextTypes = assign({}, TargetClass.contextTypes, PMVCView.contextTypes);

  // mixin(PMVCView.prototype)(TargetClass);

  return TargetClass;

}


export default connect;
