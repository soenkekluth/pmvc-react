import { SimpleCommand } from 'pmvc';
import NotificationNames from '../constants/NotificationNames';

export default class StateChangeCommand extends SimpleCommand {
  execute(note) {
    const data = note.getBody();
    // console.log('StateChangeCommand execute()', data);

    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem('pmvc-react', JSON.stringify(data));
    }

    // this.facade.send(NotificationNames.RENDER);
  }
}
