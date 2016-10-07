import { Proxy } from 'pmvc';
import assign from 'object-assign';

import { NotificationNames } from '../constants/index';

export default class CoreProxy extends Proxy {

  static NAME = 'CoreProxy';

  constructor(name , data) {
    super(name);
    this.data = data;
  }

  setData(data, sendNotification = true) {
    this.data = assign({}, this.data, data);
    if(sendNotification) {
      this.send(NotificationNames.DATA_CHANGE, this.data, this.getName());
    }
  }
}

