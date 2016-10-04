import React from 'react';
import { Mediator } from 'pmvc';
import AppProxy from '../model/app-proxy';
import App from './App';

export default class AppMediator extends Mediator {

  static NAME = 'AppMediator';
  appProxy = null;

  constructor(){
    super(AppMediator.NAME, null);
  }

  onRegister() {
    console.log('AppMediator registered');
    this.appProxy = this.facade.retrieveProxy(AppProxy.NAME);
    this.setViewComponent(<App data={this.appProxy.data}/>);
  }

  onRemove() {
    // super.onRemove();
  }
}
