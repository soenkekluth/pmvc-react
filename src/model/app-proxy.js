import { Proxy } from 'pmvc';

export default class AppProxy extends Proxy {
  static NAME = 'AppProxy';

  constructor(data) {
    super(AppProxy.NAME, data);
  }

  onRegister() {
    console.log('AppProxy registered');
  }

  onRemove() {
  }
}

