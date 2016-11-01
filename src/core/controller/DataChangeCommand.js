import { SimpleCommand } from 'pmvc';

export default class DataChangeCommand extends SimpleCommand {
  execute(note) {
    const data = note.getBody();
    // console.log('DataChangeCommand execute()', data);
    const localState = {};
    localState[note.getType()] = data;

    const state = this.facade.getState();
    if (Object.hasOwnProperty.call(state, note.getType())) {
      this.facade.updateState(localState);
    }
  }
}
