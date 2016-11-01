import CoreMediator from './CoreMediator';
import assign from 'object-assign';

import { NotificationNames } from '../constants/AppConstants';
import { applyDecorators, decorate, autobind, mixin, extendDescriptor, override, configurable } from 'core-decorators';

const mediatorDecorators = {

  handleNotification(func) {
    return notification => {
      if(notification.getName() === NotificationNames.STATE_CHANGE) {
        this.updateView();
      }
      func.call(this, notification);
    }
  },

  listNotificationInterests(func) {
    return ()=> func.call(this).concat([NotificationNames.STATE_CHANGE]);
  },


  onRegister(func) {
    return () => {
      func.call(this);
      this.updateView();
    }
  },

  onRemove(func) {
    return () => {
      func.call(this);
    }
  },
}


const inheritCoreMediator = (TargetClass) => {

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

  //   const decorators = {};
  for (let i = 0, l = propsToInherit.length; i < l; i++) {
    const b = propsToInherit[i];
    if(propsToDecorate.indexOf(b) === -1){
      TargetClass.prototype[b] = CoreMediator.prototype[b];
    }
  }

  mixin(CoreMediator.prototype)(TargetClass);



  return TargetClass;
}

export default inheritCoreMediator;
