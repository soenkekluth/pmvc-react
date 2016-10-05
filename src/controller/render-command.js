import { SimpleCommand } from 'pmvc';
import AppMediator from '../view/AppMediator';
import { NotificationNames } from '../constants';


export class StateChangeCommand extends SimpleCommand {
  execute(note) {
    console.log('StateChangeCommand execute()');
    // this.facade.retrieveMediator(AppMediator.NAME).updateView();
    this.facade.sendNotification(NotificationNames.RENDER);
  }
}

export class RenderCommand extends SimpleCommand {

  execute(note) {
    console.log('RenderCommand execute()');


    const appMediator = this.facade.retrieveMediator(AppMediator.NAME)
    if(appMediator.shouldComponentUpdate()){

    appMediator.updateView();
    const callback = () => {
      // console.log('callback');
    };
    var rootNode = this.facade.render.call(this.facade, callback);
    note.setBody(rootNode)
    }

  }
}
