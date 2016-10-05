import { SimpleCommand } from 'pmvc';
import AppProxy from '../model/app-proxy';
import CounterProxy from '../model/counter-proxy';
import AppMediator from '../view/AppMediator';
// import SubviewMediator from '../view/SubviewMediator';

export class ModelPrepCommand extends SimpleCommand {
  execute(note) {
    console.log('ModelPrepCommand execute()');
    const data = note.getBody();
    this.facade.registerProxy(new AppProxy(data[AppProxy.NAME]));
    this.facade.registerProxy(new CounterProxy(CounterProxy.NAME, data[CounterProxy.NAME]));
    this.facade.registerProxy(new CounterProxy(CounterProxy.NAME_LOCAL, data[CounterProxy.NAME_LOCAL]));
  }
}


export class ViewPrepCommand extends SimpleCommand {

  execute(note) {
    console.log('ViewPrepCommand execute()');
    this.facade.registerMediator(new AppMediator());
  }
}
