import { Proxy } from 'pmvc';
// import { NotificationNames } from '../constants/index';

export default class SubProxy extends Proxy {
  static NAME = 'SubProxy';

  constructor(data) {
    super(SubProxy.NAME, data);
  }


  count() {
    return ++this.data;
  }


  onRegister() {
    console.log('SubProxy registered');
  }

  onRemove() {
  }
}

