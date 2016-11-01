import PMVCMediator from './PMVCMediator';
import { applyDecorators, decorate, autobind, mixin } from 'core-decorators';

const mediatorDecorators = {

  handleNotification(func) {
    return (notification) => {
      PMVCMediator.prototype.handleNotification.call(this, notification);
      func.call(this, notification);
    };
  },

  listNotificationInterests(func) {
    return () => PMVCMediator.prototype.listNotificationInterests.call(this).concat(func.call(this));
  },


  onRegister(func) {
    return () => {
      func.call(this);
      PMVCMediator.prototype.onRegister.call(this);
    };
  },

  onRemove(func) {
    return () => {
      func.call(this);
      PMVCMediator.prototype.onRemove.call(this);
    };
  },
};


const connectMediator = (TargetClass) => {
  const { prototype } = TargetClass;
  const propsToInherit = ['handleNotification', 'listNotificationInterests', 'onRegister', 'onRemove'];
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
      decorators[b] = [autobind, decorate(mediatorDecorators[b])];
    }

    applyDecorators(TargetClass, decorators);
  }

  for (let i = 0, l = propsToInherit.length; i < l; i++) {
    const b = propsToInherit[i];
    if (propsToDecorate.indexOf(b) === -1) {
      TargetClass.prototype[b] = PMVCMediator.prototype[b];
    }
  }

  mixin(PMVCMediator.prototype)(TargetClass);

  return TargetClass;
};

export default connectMediator;
