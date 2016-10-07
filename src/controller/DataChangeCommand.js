import { SimpleCommand } from 'pmvc';

export default class DataChangeCommand extends SimpleCommand {
  execute(note) {

    const data = note.getBody();
    console.log('DataChangeCommand execute()', data);
    const state = {};
    state[note.getType()] = data;

    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('pmvc-react', JSON.stringify(data));
    }

    this.facade.updateState(state);

  }
}
