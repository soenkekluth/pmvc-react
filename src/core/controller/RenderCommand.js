import { SimpleCommand } from 'pmvc';

export default class RenderCommand extends SimpleCommand {

  execute(note) {
    // console.log('RenderCommand execute()');

    // const appMediator = this.facade.getMediator(AppMediator.NAME);
    // if(appMediator){
    //   appMediator.updateView();
    // }

    // if (appMediator.shouldComponentUpdate()) {
      // const callback = () => {};
      // this.facade.render.call(this.facade, callback);
      // const rootNode = this.facade.render.call(this.facade, callback);
      // note.setBody(rootNode);
    // }
  }
}
