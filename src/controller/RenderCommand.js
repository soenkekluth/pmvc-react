import { SimpleCommand } from 'pmvc';
import AppMediator from '../view/AppMediator';

export default class RenderCommand extends SimpleCommand {

  execute(note) {

    console.log('RenderCommand execute()');

    const appMediator = this.facade.getMediator(AppMediator.NAME);

    if (appMediator.shouldComponentUpdate()) {
      appMediator.updateView();
      const callback = () => {};
      var rootNode = this.facade.render.call(this.facade, callback);
      note.setBody(rootNode)
    }
  }
}
