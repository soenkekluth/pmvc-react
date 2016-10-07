import { SimpleCommand } from 'pmvc';
import AppProxy from '../model/AppProxy';
import CounterProxy from '../model/CounterProxy';
import AppMediator from '../view/AppMediator';

export class ModelPrepCommand extends SimpleCommand {
  execute(note) {
    console.log('ModelPrepCommand execute()');
    // const data = note.getBody();
    this.facade.addProxy(new AppProxy());
    this.facade.addProxy(new CounterProxy(CounterProxy.NAME));
    this.facade.addProxy(new CounterProxy(CounterProxy.NAME_LOCAL));
  }
}


export class ViewPrepCommand extends SimpleCommand {

  execute(note) {
    console.log('ViewPrepCommand execute()');
    this.facade.addMediator(new AppMediator());
  }
}
