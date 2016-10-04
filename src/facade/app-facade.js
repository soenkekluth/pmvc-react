import { Facade } from 'pmvc';
import { NotificationNames } from '../constants';

import AppMediator from '../view/AppMediator';
import StartupCommand from '../controller/startup-command';
import {RenderCommand, StateCommand} from '../controller/render-command';


export default class AppFacade extends Facade {
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


  get Component(){
    return this.retrieveMediator(AppMediator.NAME).view;
  }


  startup(initialState) {
    this.sendNotification(NotificationNames.STARTUP, initialState);
    return this;
  }

  shutdown() {
    return this;
  }

  render(cb) {

  }

  initializeView() {
    super.initializeView();
  }


  initializeController() {
    super.initializeController();
    this.registerCommand(NotificationNames.STARTUP, StartupCommand);
    this.registerCommand(NotificationNames.STATE_UPDATE, StateCommand);
    this.registerCommand(NotificationNames.RENDER, RenderCommand);
  }
}
