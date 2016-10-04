import { SimpleCommand } from 'pmvc';
import AppProxy from '../model/app-proxy';
import AppMediator from '../view/AppMediator';

export class ModelPrepCommand extends SimpleCommand {
  execute(note) {
    console.log('ModelPrepCommand execute()');
    const data = note.getBody();
    const appProxy = new AppProxy(data);
    this.facade.registerProxy(appProxy);
  }
}


export class ViewPrepCommand extends SimpleCommand {

  execute(note) {
    console.log('ViewPrepCommand execute()');
    const appMediator = new AppMediator();
    this.facade.registerMediator(appMediator);
    this.facade.Component = appMediator.view;
  }
}
