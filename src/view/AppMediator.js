import React from 'react';
import assign from 'object-assign';
import { Mediator } from 'pmvc';
import AppProxy from '../model/AppProxy';
import CounterProxy from '../model/CounterProxy';
import App from './App';
import {EventNames} from '../constants';

export default class AppMediator extends Mediator {

  static NAME = 'AppMediator';

  sendEvent(name, body, type) {
    const counter = this.facade.getProxy(CounterProxy.NAME);
    // console.log(this);
     if(name === EventNames.APP_CLICK_GLOBAL_COUNT) {
      counter.up();
     }
   }

}
