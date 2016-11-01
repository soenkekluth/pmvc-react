import { Mediator } from 'pmvc';
import { EventNames } from '../constants/AppConstants';

export default class SubViewMediator extends Mediator {

  static NAME = 'SubViewMediator';

  listNotificationInterests() {
    return [EventNames.SUBVIEW_LOCAL_COUNT];
  }

  handleNotification(notification) {

    if (notification.getName() === EventNames.SUBVIEW_LOCAL_COUNT) {
      if (notification.body) {
        this.view.setViewState({
          counterLocal: notification.body.count
        })
      }
    }
  }

  onRegister() {
    // this.facade.addCommand(EventNames.SUBVIEW_LOCAL_COUNT, CounterCommand);
  }
}
