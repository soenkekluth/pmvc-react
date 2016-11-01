import { Proxy } from 'pmvc';
import assign from 'object-assign';

import NotificationNames from '../constants/NotificationNames';

export default class PMVCProxy extends Proxy {

  static NAME = 'PMVCProxy';

  constructor(name , data) {
    super(name);
    this.data = data;
  }

  setData(data, sendNotification = true) {
    super.setData(assign({}, this.data, data));

    if(sendNotification) {
      this.facade.sendNotification(NotificationNames.DATA_CHANGE, this.data, this.getName());
    }
  }
}

