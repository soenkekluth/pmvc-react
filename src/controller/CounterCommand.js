import { SimpleCommand } from 'pmvc';
import { EventNames } from '../constants/AppConstants';
import AppMediator from '../view/AppMediator';
import CounterProxy from '../model/CounterProxy';

export default class CounterCommand extends SimpleCommand {

  execute(note) {
    let counter;
    switch (note.name) {
      case EventNames.CLICK_GLOBAL_COUNT:
        counter = this.facade.getProxy(CounterProxy.NAME);
        break;
      case EventNames.SUBVIEW_LOCAL_COUNT:
        counter = this.facade.getProxy(CounterProxy.NAME_LOCAL);
        break;
    }

    if (counter) {
      counter.up();
      note.setBody(counter.getData());
    }
  }
}
