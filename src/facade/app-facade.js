import { Facade } from 'pmvc';
import { NotificationNames } from '../constants';
import StartupCommand from '../controller/startup-command';


export default class AppFacade extends Facade {
  static NAME = 'AppFacade';

  Component = null;

  static getInstance(key) {
    if (!key) {
      return null;
    }
    if (!Facade.instanceMap[key]) {
      return new AppFacade(key);
    }

    return Facade.instanceMap[key];
  }


  startup(initialState) {
    this.sendNotification(NotificationNames.STARTUP, initialState);
    return this;
  }

  shutdown() {
    return this;
  }




  initializeView() {
    super.initializeView();
  }


  initializeController() {
    super.initializeController();
    this.registerCommand(NotificationNames.STARTUP, StartupCommand);
    // this.registerCommand(NotificationNames.TEST, TestCommand);
    // this.registerCommand( NotificationNames.STARTUP_COMPLETE, StartupCompleteCommand);
  }
}
