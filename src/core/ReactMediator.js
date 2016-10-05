import React from 'react';
import assign from 'object-assign';
import { Mediator } from 'pmvc';

export default class ReactMediator extends Mediator {

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

  getProxy(name) {
    return this.facade.retrieveProxy(name);
  }

  sendEvent(name, body, type = 'Event') {
    this.sendNotification(name, body, type);
  }

  updateView() {}


  onRegister() {
    console.log('ReactMediator registered');
  }

  onRemove() {
    for (var key in this.notificationMap) {
      delete(this.notificationMap[key]);
    }
    this.notificationMap = null;
    super.onRemove();
  }
}
