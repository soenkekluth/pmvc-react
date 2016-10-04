import { SimpleCommand } from 'pmvc';
import AppProxy from '../model/app-proxy';
import SubProxy from '../model/sub-proxy';
import AppMediator from '../view/AppMediator';
// import SubviewMediator from '../view/SubviewMediator';

export class ModelPrepCommand extends SimpleCommand {
  execute(note) {
    console.log('ModelPrepCommand execute()');
    const data = note.getBody();
    this.facade.registerProxy(new AppProxy(data));
    this.facade.registerProxy(new SubProxy(0));
  }
}


export class ViewPrepCommand extends SimpleCommand {

  execute(note) {
    console.log('ViewPrepCommand execute()');
    const appMediator = new AppMediator();
    this.facade.registerMediator(appMediator);
  }
}
