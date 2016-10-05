import React from 'react';
import assign from 'object-assign';
import { Mediator } from 'pmvc';
import AppProxy from '../model/app-proxy';
import CounterProxy from '../model/counter-proxy';
import SubviewMediator from './SubviewMediator';
import { NotificationNames } from '../constants';
import App from './App';

export default class AppMediator extends Mediator {

  static NAME = 'AppMediator';

  app = null;
  counter = null;

  constructor() {
    super(AppMediator.NAME, null);
  }

  listNotificationInterests() {
    return [NotificationNames.RENDER];
  }

  handleNotification(notification) {
    switch(notification.getName()){
      case NotificationNames.RENDER:
        if(!this.rootNode){
          this.rootNode = notification.getBody();
        }
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


  shouldComponentUpdate() {
    if (this.rootNode) {
      const props = assign({}, this.app.data, this.counter.data);
      return this.rootNode.shouldComponentUpdate(props, null);
    }
    return true;
  }



  updateView(){
    this.setViewComponent(<App onClickButton={ this.onClickButton } sendEvent={this.sendEvent.bind(this)} {...this.app.data } {...this.counter.data }/>);
  }


  onRegister() {
    console.log('AppMediator registered');

    this.app = this.facade.retrieveProxy(AppProxy.NAME);
    this.counter = this.facade.retrieveProxy(CounterProxy.NAME);

    this.onClickButton = this.onClickButton.bind(this);
    this.updateView();
  }


  onClickButton(e) {
    this.counter.up();
  }
}
