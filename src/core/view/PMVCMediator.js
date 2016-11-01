import { Mediator } from 'pmvc';
import NotificationNames from '../constants/NotificationNames';

var instanceCount = 0;

export default class PMVCMediator extends Mediator {

  static NAME = 'PMVCMediator';

  constructor(name, view) {
    if(!name){
      instanceCount = instanceCount+1;
      name = PMVCMediator.NAME+ '_'+instanceCount;
    }
    super(name, view);
  }

  handleNotification(notification) {
    if(notification.getName() === NotificationNames.STATE_CHANGE) {
      this.updateView();
    }
  }

  listNotificationInterests() {
    return [NotificationNames.STATE_CHANGE]
  }


  // addNotificationHandler(notificationName, handler) {
  //   this.notificationMap[notificationName] = handler;
  // }

  // removeNotificationHandler(notificationName) {
  //   this.notificationMap[notificationName] = null;
  //   delete(this.notificationMap[notificationName]);
  // }


  updateView() {
    if (this.view && this.view.handleChange) {
      this.view.handleChange();
    }
  }

  // sendEvent(name, body, type = 'Event') {
  //   this.send(name, body, type);
  // }

  onRegister() {
    this.updateView();
  }

  onRemove() {
    // for (var key in this.notificationMap) {
    //   delete(this.notificationMap[key]);
    // }
    // this.notificationMap = null;
    // super.onRemove();
  }
}
