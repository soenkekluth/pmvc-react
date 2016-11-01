import { Mediator } from 'pmvc';
import {EventNames, NotificationNames} from '../constants/AppConstants';

export default class CoreMediator extends Mediator {

  static NAME = 'CoreMediator';

  constructor(name, view) {
    if(!name){
      name = CoreMediator.NAME+ '_'+Math.round(Math.random()*1000);
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


  // notificationMap = {};

  // constructor(name, view) {
  //   if(!name){
  //     name = CoreMediator.NAME+ '_'+Math.round(Math.random()*1000);
  //   }
  //   super(name, view);
  // }

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
