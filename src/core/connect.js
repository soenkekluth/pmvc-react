import PMVCView from './PMVCView';
import { applyDecorators, decorate, autobind, extendDescriptor, override, configurable } from 'core-decorators';

const connect = (TargetClass) =>{

  applyDecorators(TargetClass,{
    // componentDidUpdate:[autobind, decorate(PMVCView.prototype.componentDidUpdate)],
    // shouldComponentUpdate:[override],
    componentDidMount:[autobind, decorate(PMVCView.prototype.componentDidMount)],
    // componentWillReceiveProps:[decorate(PMVCView.prototype.componentWillReceiveProps.bind(this))],
    shouldComponentUpdate:[autobind, decorate(PMVCView.prototype.shouldComponentUpdate)],
    // componentWillMount:[decorate],
    // render:[decorate(PMVCView.prototype.render)],
  });


  return TargetClass;

}


export default connect;
