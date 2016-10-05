import { Proxy } from 'pmvc';
import assign from 'object-assign';
import { NotificationNames } from '../constants/index';

const initialState = {
  count: 0
};

export default class CounterProxy extends Proxy {

  static TYPE = 'counter';
  static NAME = 'counterGlobal';
  static NAME_LOCAL = 'counterLocal';

  constructor(name, data) {
    super(name);
    this.data = assign({}, initialState, data);
  }

  up() {
    this.setData({
      count: this.data.count + 1
    });
  }

  down() {
    this.setData({
      count: this.data.count - 1
    });
  }


  setData(data) {
    super.setData(data);
    this.sendNotification(NotificationNames.STATE_CHANGE, this.data, CounterProxy.TYPE);
  }


  get count() {
    return this.data.count
  }
}
