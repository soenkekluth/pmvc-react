import { Mediator } from 'pmvc';
import { NotificationNames, EventNames } from '../constants/index';
import CounterProxy from '../model/counter-proxy';

export default class SubviewMediator extends Mediator {

  static NAME = 'SubviewMediator';
  counterGlobal = null;
  counterLocal = null;


  listNotificationInterests() {
    return [
      EventNames.SUBVIEW_GLOBAL_COUNT,
      EventNames.SUBVIEW_LOCAL_COUNT,
      NotificationNames.STATE_CHANGE
    ];
  }

  handleNotification(notification) {
    switch (notification.getName()) {
      case EventNames.SUBVIEW_GLOBAL_COUNT:
        this.counterGlobal.up();
        break;
      case EventNames.SUBVIEW_LOCAL_COUNT:
        this.counterLocal.up();
        break;
      case NotificationNames.STATE_CHANGE:
        if (notification.getType() === CounterProxy.TYPE) {
          this.view.setState({
            counterGlobal: this.counterGlobal.count,
            counterLocal: this.counterLocal.count
          });
        }
        break;

        // case NotificationNames.STATE_CHANGE:
        // if (notification.getType() === CounterProxy.NAME) {
        //   this.view.setState(notification.getBody());
        // }
        // break;
      default:
        break;
    }
  }


  onRegister() {
    this.counterGlobal = this.facade.retrieveProxy(CounterProxy.NAME);
    this.counterLocal = this.facade.retrieveProxy(CounterProxy.NAME_LOCAL);
    // console.log(this.view)
    this.view.setState({
      counterGlobal: this.counterGlobal.count,
      counterLocal: this.counterLocal.count
    });
  }
}
