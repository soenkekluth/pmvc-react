import PMVCProxy from '../core/model/PMVCProxy';
import assign from 'object-assign';

const initialState = {
  count: 0
};

export default class CounterProxy extends PMVCProxy {

  static NAME = 'counterGlobal';
  static NAME_LOCAL = 'counterLocal';

  constructor(name, data) {
    super(name, assign({}, initialState, data));
  }

  up() {
    this.setData({
      count: this.getData().count + 1
    });
  }

  down() {
    this.setData({
      count: this.getData().count - 1
    });
  }


  get count(){
    return this.getData().count;
  }
}
