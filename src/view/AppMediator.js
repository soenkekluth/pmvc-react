import React from 'react';
import { Mediator } from 'pmvc';
import appData from '../model/app-proxy';
import SubviewMediator from './SubviewMediator';
import { NotificationNames } from '../constants';
import App from './App';

export default class AppMediator extends Mediator {

  static NAME = 'AppMediator';
  appData = null;

  constructor() {
    super(AppMediator.NAME, null);
  }

  listNotificationInterests() {
    return [NotificationNames.RENDER];
  }

  handleNotification(notification) {
    switch(notification.getName()){
      case NotificationNames.RENDER:
        if(!this.facade.hasMediator(SubviewMediator.NAME)){
          const appView = notification.getBody();
          this.facade.registerMediator(new SubviewMediator(SubviewMediator.NAME, appView.refs.subview));
        }

      break;
      default:
      break;
    }
  }


  sendEvent(name, body, type) {
    this.sendNotification(name, body, 'Event');
  }

  updateView(){
    this.setViewComponent(<App onClickButton={ this.onClickButton } sendEvent={this.sendEvent.bind(this)} {...this.appData.getData() }/>);
  }


  onRegister() {
    console.log('AppMediator registered');
    this.appData = this.facade.retrieveProxy(appData.NAME);
    this.onClickButton = this.onClickButton.bind(this);
    this.updateView();
  }


  onClickButton(e) {
    this.appData.countClick();
  }


  onRemove() {
    // super.onRemove();
  }
}
