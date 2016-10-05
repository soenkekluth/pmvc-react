import { SimpleCommand } from 'pmvc';
import AppMediator from '../view/AppMediator';
import AppProxy from '../model/app-proxy';
import CounterProxy from '../model/counter-proxy';
import { NotificationNames } from '../constants';


export class StateChangeCommand extends SimpleCommand {
  execute(note) {
    console.log('StateChangeCommand execute()');

    const appProxy = this.facade.retrieveProxy(AppProxy.NAME);
    const counterGlobal = this.facade.retrieveProxy(CounterProxy.NAME);
    const counterLocal = this.facade.retrieveProxy(CounterProxy.NAME_LOCAL);

    const data = {
      app: appProxy.data,
      counterGlobal: counterGlobal.data,
      counterLocal: counterLocal.data
    };

    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('pmvc-react', JSON.stringify(data));
    }

    this.facade.sendNotification(NotificationNames.RENDER);
  }
}

export class RenderCommand extends SimpleCommand {

  execute(note) {
    console.log('RenderCommand execute()');

    const appMediator = this.facade.retrieveMediator(AppMediator.NAME)
    if (appMediator.shouldComponentUpdate()) {

      appMediator.updateView();
      const callback = () => {};
      var rootNode = this.facade.render.call(this.facade, callback);
      note.setBody(rootNode)
    }
  }
}
