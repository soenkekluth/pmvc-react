import { Facade } from 'pmvc';
import CounterCommand from '../controller/CounterCommand';
import PMVCFacade from '../core/PMVCFacade';

import { NotificationNames, EventNames } from '../constants/AppConstants';
import App from '../view/App';
import AppMediator from '../view/AppMediator';


export default class AppFacade extends PMVCFacade {

  static NAME = 'AppFacade';

  static getInstance(key) {
    if (!key) {
      return null;
    }
    if (!Facade.instanceMap[key]) {
      return new AppFacade(key);
    }

    return Facade.instanceMap[key];
  }


  initializeController() {
    super.initializeController();
    this.addCommand(EventNames.CLICK_GLOBAL_COUNT, CounterCommand);
    this.addCommand(EventNames.SUBVIEW_LOCAL_COUNT, CounterCommand);
  }


  // initializeView() {
  //   super.initializeView();
  //   this.mapView(App, AppMediator);
  // }
}
