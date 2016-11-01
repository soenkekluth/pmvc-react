import { Facade } from 'pmvc';
import NotificationNames  from '../constants/NotificationNames';
import PMVCMediator from '../view/PMVCMediator';
import StartupCommand from '../controller/StartupCommand';
import RenderCommand from '../controller/RenderCommand';
import StateChangeCommand from '../controller/StateChangeCommand';
import DataChangeCommand from '../controller/DataChangeCommand';
import assign from 'object-assign';
import connectMediator from '../view/connectMediator';

export default class PMVCFacade extends Facade {

  static NAME = 'PMVCFacade';

  mediatorMap = [];
  state = {};


  constructor(key){
    super(key);
    this.mediatorMap = [];
    this.state = {};
    this.dispatch = this.sendEvent.bind(this);
  }

  static getInstance(key) {
    if (!key) {
      return null;
    }
    if (!Facade.instanceMap[key]) {
      return new PMVCFacade(key);
    }

    return Facade.instanceMap[key];
  }

  startup(initialState) {
    if(initialState){
      this.state = assign({}, this.state, initialState);
    }
    this.send(NotificationNames.STARTUP, this.state);
    return this;
  }

  shutdown() {
    return this;
  }

  sendEvent(name, body, type) {
    this.send(name, body, 'Event');
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


  unsubscribe(view) {
    if (view.mediator) {
      if (this.hasMediator(view.mediator)) {
        this.removeMediator(view.mediator);
        view.mediator = null;
      }
    }
  }

  subscribe(view, MediatorClass, mediatorName) {
    let mediator = null;

    if(MediatorClass) {
      mediatorName = mediatorName || MediatorClass.NAME;
    }else if(mediatorName){
      mediator = this.getMediator(mediatorName);
      if (mediator) {
        mediator.setViewComponent(view);
      }
    }

    if(!mediator) {
      if(!MediatorClass){
        MediatorClass = PMVCMediator;
      }
      MediatorClass = (MediatorClass === PMVCMediator ? PMVCMediator : connectMediator(MediatorClass));
      mediator = new MediatorClass();
      mediator.setViewComponent(view);
      this.addMediator(mediator);
    }

    return mediator;
  }

  mapView(ViewClass, MediatorClass = PMVCMediator) {
    this.mediatorMap.push({
      ViewClass : ViewClass,
      MediatorClass : MediatorClass
    });
  }


  getState() {
    return this.state;
  }

  render(cb) {

  }

  initializeController() {
    super.initializeController();
    this.addCommand(NotificationNames.STARTUP, StartupCommand);
    this.addCommand(NotificationNames.DATA_CHANGE, DataChangeCommand);
    this.addCommand(NotificationNames.STATE_CHANGE, StateChangeCommand);
    this.addCommand(NotificationNames.RENDER, RenderCommand);
  }
}
