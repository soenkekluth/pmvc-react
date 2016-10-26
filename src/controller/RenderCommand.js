import { SimpleCommand } from 'pmvc';
import AppMediator from '../view/AppMediator';

export default class RenderCommand extends SimpleCommand {

  execute(note) {
    console.log('RenderCommand execute()');

    // if (appMediator.shouldComponentUpdate()) {
      const callback = () => {};
      this.facade.render.call(this.facade, callback);
      // const rootNode = this.facade.render.call(this.facade, callback);
      // note.setBody(rootNode);
    // }
  }
}
