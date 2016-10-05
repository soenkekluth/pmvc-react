import { Proxy } from 'pmvc';
import assign from 'object-assign';
import { NotificationNames } from '../constants/index';

const initialState = {
  count : 0
};

export default class CounterProxy extends Proxy {

  static NAME = 'CounterProxy';
  static NAME_SUB = 'CounterProxySub';

  constructor(name, data) {
    super(name, assign({}, initialState, data));
  }

  up() {
    this.data.count = this.data.count +1;
    this.sendNotification(NotificationNames.STATE_CHANGE, this.data, CounterProxy.NAME);
  }

  down() {
    this.data.count = this.data.count -1;
    this.sendNotification(NotificationNames.STATE_CHANGE, this.data, CounterProxy.NAME);
  }


  get count(){
    return this.data.count
  }
}
