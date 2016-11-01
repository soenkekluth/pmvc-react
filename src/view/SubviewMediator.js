import { Mediator } from 'pmvc';
import { NotificationNames, EventNames } from '../constants/AppConstants';
import CounterProxy from '../model/CounterProxy';
import CounterCommand from '../controller/CounterCommand';

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
