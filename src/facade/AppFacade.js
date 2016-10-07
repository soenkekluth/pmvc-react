import { Facade } from 'pmvc';
import { NotificationNames } from '../constants';
import AppMediator from '../view/AppMediator';
import StartupCommand from '../controller/StartupCommand';
import RenderCommand from '../controller/RenderCommand';
import StateChangeCommand from '../controller/StateChangeCommand';
import DataChangeCommand from '../controller/DataChangeCommand';
import assign from 'object-assign';

export default class AppFacade extends Facade {
  static NAME = 'AppFacade';

  state = {};

  static getInstance(key) {
    if (!key) {
      return null;
    }
    if (!Facade.instanceMap[key]) {
      return new AppFacade(key);
    }

    return Facade.instanceMap[key];
  }


  get Component() {
    return this.getMediator(AppMediator.NAME).view;
  }


  startup(initialState) {
    this.send(NotificationNames.STARTUP, initialState);
    return this;
  }

  shutdown() {
    return this;
  }


  updateState(chunk) {
    this.state = assign({}, this.state, chunk);
    this.send(NotificationNames.STATE_CHANGE, this.state, 'state');
  }

  setState(state) {
    this.state = assign({}, this.state, state);
    Object.keys(state).forEach(key => {
      const proxy = this.getProxy(key);
      if (proxy) {
        proxy.setData(state[key], false);
      }
    });
    this.send(NotificationNames.STATE_CHANGE, this.state, 'state');
  }

  getState() {
    return this.state;
  }

  render(cb) {

  }

  initializeView() {
    super.initializeView();
  }


  initializeController() {
    super.initializeController();
    this.addCommand(NotificationNames.STARTUP, StartupCommand);
    this.addCommand(NotificationNames.DATA_CHANGE, DataChangeCommand);
    this.addCommand(NotificationNames.STATE_CHANGE, StateChangeCommand);
    this.addCommand(NotificationNames.RENDER, RenderCommand);
  }
}
