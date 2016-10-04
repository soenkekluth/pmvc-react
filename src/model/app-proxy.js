import { Proxy } from 'pmvc';
import { NotificationNames } from '../constants/index';

export default class AppProxy extends Proxy {
  static NAME = 'AppProxy';

  constructor(data) {
    super(AppProxy.NAME, data);
  }


  countClick() {
    this.data.clickCount = this.data.clickCount +1;
    this.sendNotification(NotificationNames.STATE_UPDATE, this.data);
  }


  onRegister() {
    console.log('AppProxy registered');
  }

  onRemove() {
  }
}

