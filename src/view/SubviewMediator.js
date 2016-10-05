import CoreMediator from '../core/CoreMediator';
import { NotificationNames, EventNames } from '../constants/index';
import CounterProxy from '../model/counter-proxy';

export default class SubviewMediator extends CoreMediator {

  static NAME = 'SubviewMediator';

  counterGlobal = null;
  counterLocal = null;

  listNotificationInterests(){
    return [
      EventNames.SUBVIEW_GLOBAL_COUNT,
      EventNames.SUBVIEW_LOCAL_COUNT,
      NotificationNames.STATE_CHANGE
    ];
  }

  onStateChange(notification){
    if (notification.getType() === CounterProxy.TYPE) {
      this.view.setState({
        counterGlobal: this.counterGlobal.count,
        counterLocal: this.counterLocal.count
      });
    }
  }

  onRegister() {

    this.counterGlobal = this.facade.retrieveProxy(CounterProxy.NAME);
    this.counterLocal = this.facade.retrieveProxy(CounterProxy.NAME_LOCAL);

    this.addNotificationHandler(EventNames.SUBVIEW_GLOBAL_COUNT, this.counterGlobal.up.bind(this.counterGlobal));
    this.addNotificationHandler(EventNames.SUBVIEW_LOCAL_COUNT, this.counterLocal.up.bind(this.counterLocal));
    this.addNotificationHandler(NotificationNames.STATE_CHANGE, this.onStateChange.bind(this));

    this.view.setState({
      counterGlobal: this.counterGlobal.count,
      counterLocal: this.counterLocal.count
    });
  }
}
