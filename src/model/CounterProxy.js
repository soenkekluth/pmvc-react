import CoreProxy from '../core/CoreProxy';
import assign from 'object-assign';

const initialState = {
  count: 0
};

export default class CounterProxy extends CoreProxy {

  static NAME = 'counterGlobal';
  static NAME_LOCAL = 'counterLocal';

  constructor(name, data) {
    super(name, assign({}, initialState, data));
  }

  up() {
    super.setData({
      count: this.getData().count + 1
    });
  }

  down() {
    super.setData({
      count: this.getData().count - 1
    });
  }
}
