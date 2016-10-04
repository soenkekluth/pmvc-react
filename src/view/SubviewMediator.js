import { Mediator } from 'pmvc';
import { NotificationNames } from '../constants/index';
import SubProxy from '../model/sub-proxy';

export default class SubviewMediator extends Mediator {

  static NAME = 'SubviewMediator';
  subData = null;


  listNotificationInterests() {
    return [NotificationNames.SUBVIEW_COUNT];
  }

  handleNotification(notification) {
    switch(notification.getName()){
      case NotificationNames.SUBVIEW_COUNT:
        this.view.setState({
          count: this.subData.count()
        });
      break;
      default:
      break;
    }
  }


  onRegister() {
    this.subData =  this.facade.retrieveProxy(SubProxy.NAME);
  }
}
