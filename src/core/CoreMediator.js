import { Mediator } from 'pmvc';

export default class CoreMediator extends Mediator {

  notificationMap = {};


  addNotificationHandler(notificationName, handler) {
    this.notificationMap[notificationName] = handler;
  }

  removeNotificationHandler(notificationName) {
    this.notificationMap[notificationName] = null;
    delete(this.notificationMap[notificationName]);
  }


  listNotificationInterests() {
    return Object.keys(this.notificationMap);
  }

  handleNotification(notification) {
    const handler = this.notificationMap[notification.getName()];
    if (handler) {
      handler.apply(null, [notification]);
    }
  }


  sendEvent(name, body, type = 'Event') {
    this.send(name, body, type);
  }

  updateView() {}


  onRegister() {
    console.log('CoreMediator registered');
  }

  onRemove() {
    for (var key in this.notificationMap) {
      delete(this.notificationMap[key]);
    }
    this.notificationMap = null;
    super.onRemove();
  }
}
