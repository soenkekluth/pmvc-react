import CoreMediator from '../core/CoreMediator';
import { NotificationNames } from '../constants/index';
import CounterProxy from '../model/CounterProxy';

export default class SubSubViewMediator extends CoreMediator {

  static NAME = 'SubSubViewMediator';

  constructor(name, view) {
    super(name, view);
    this.addNotificationHandler(NotificationNames.DATA_CHANGE, this.onStateChange.bind(this));
  }


  onStateChange(notification) {
    if (notification.getType() === CounterProxy.TYPE) {
      // this.view.setState({
      //   counterGlobal: this.counterGlobal.count,
      //   counterLocal: this.counterLocal.count
      // });
    }
  }
}
