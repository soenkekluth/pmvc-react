import { SimpleCommand } from 'pmvc';
import AppProxy from '../model/AppProxy';
import CounterProxy from '../model/CounterProxy';

export class ModelPrepCommand extends SimpleCommand {
  execute(note) {
    // console.log('ModelPrepCommand execute()');
    const initialState = note.getBody();
    // this.facade.setState(data);

    // const data = note.getBody();
    this.facade.addProxy(new AppProxy(null, initialState[AppProxy.NAME]));
    this.facade.addProxy(new CounterProxy(CounterProxy.NAME, initialState[CounterProxy.NAME]));
    this.facade.addProxy(new CounterProxy(CounterProxy.NAME_LOCAL, initialState[CounterProxy.NAME_LOCAL]));
  }
}

export class ViewPrepCommand extends SimpleCommand {
  execute(note) {
    // console.log('ViewPrepCommand execute()');
    // this.facade.addMediator(new AppMediator());
  }
}
