import { Mediator } from 'pmvc';

import { NotificationNames, EventNames } from '../constants/index';

export default class SubSubViewMediator extends Mediator {

  static NAME = 'SubSubViewMediator';


  listNotificationInterests() {
    return [
      NotificationNames.STATE_CHANGE
    ];
  }

  handleNotification(notification) {
    switch (notification.getName()) {

      case NotificationNames.STATE_CHANGE:

        console.log(this.view);
        console.log('renderedView', this.renderedView);
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


}
