import React from 'react';
import assign from 'object-assign';
import { Mediator } from 'pmvc';
import AppProxy from '../model/AppProxy';
import CounterProxy from '../model/CounterProxy';
import App from './App';

export default class AppMediator extends Mediator {

  static NAME = 'AppMediator';

  app = null;
  counter = null;

  constructor() {
    super(AppMediator.NAME, null);
  }

  sendEvent(name, body, type) {
    this.send(name, body, 'Event');
  }


  shouldComponentUpdate() {
    if (this.renderedView) {
      const props = assign({}, this.app.data, this.counter.data);
      return this.renderedView.shouldComponentUpdate(props, null);
    }
    return true;
  }



  updateView(){
    this.setViewComponent(<App onClickButton={ this.onClickButton } sendEvent={this.sendEvent.bind(this)} {...this.app.data } {...this.counter.data }/>);
  }


  onRegister() {
    console.log('AppMediator registered');

    this.app = this.facade.getProxy(AppProxy.NAME);
    this.counter = this.facade.getProxy(CounterProxy.NAME);

    this.onClickButton = this.onClickButton.bind(this);
    this.updateView();
  }


  onClickButton(e) {
    this.counter.up();
  }
}
