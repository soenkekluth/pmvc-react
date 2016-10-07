import CoreMediator from '../core/CoreMediator';
import { NotificationNames, EventNames } from '../constants/index';
import CounterProxy from '../model/CounterProxy';

export default class SubviewMediator extends CoreMediator {

  static NAME = 'SubviewMediator';

  counterGlobal = null;
  counterLocal = null;

  listNotificationInterests(){
    return [
      EventNames.SUBVIEW_GLOBAL_COUNT,
      EventNames.SUBVIEW_LOCAL_COUNT,
      NotificationNames.DATA_CHANGE
    ];
  }

  onStateChange(notification){
    if (notification.getType() === this.counterGlobal.getName() || notification.getType() === this.counterLocal.getName()) {
      this.view.setState({
        counterGlobal: this.counterGlobal.count,
        counterLocal: this.counterLocal.count
      });
    }
  }

  onRegister() {

    this.counterGlobal = this.facade.getProxy(CounterProxy.NAME);
    this.counterLocal = this.facade.getProxy(CounterProxy.NAME_LOCAL);

    this.addNotificationHandler(EventNames.SUBVIEW_GLOBAL_COUNT, this.counterGlobal.up.bind(this.counterGlobal));
    this.addNotificationHandler(EventNames.SUBVIEW_LOCAL_COUNT, this.counterLocal.up.bind(this.counterLocal));
    this.addNotificationHandler(NotificationNames.DATA_CHANGE, this.onStateChange.bind(this));

    this.view.setState({
      counterGlobal: this.counterGlobal.count,
      counterLocal: this.counterLocal.count
    });
  }
}
