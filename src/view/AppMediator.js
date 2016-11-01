import { Mediator } from 'pmvc';
import {NotificationNames, EventNames} from '../constants/AppConstants';
import CounterProxy from '../model/CounterProxy';

export default class AppMediator extends Mediator {

  static NAME = 'AppMediator';

  constructor(name, view) {
    super(AppMediator.NAME, view);
  }

  // handleNotification(notification) {
  //   console.log('handleNotification',notification )
  // }

  // listNotificationInterests() {
  //   return [];
  // }

  // handleNotification(notification) {
  //   const name = notification.getName();
  //   switch(name){
  //     case EventNames.CLICK_GLOBAL_COUNT:
  //       const counter = this.facade.getProxy(CounterProxy.NAME);
  //       if(counter){
  //         counter.up();
  //       }
  //   }
  // }

}

// export default AppMediator;
