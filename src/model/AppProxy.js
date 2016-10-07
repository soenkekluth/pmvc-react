import CoreProxy from '../core/CoreProxy';
import assign from 'object-assign';

const initialState = {
  title: 'PMVC (PureMVC) - React',
  description: 'pmvc app build with react as the view layer'
};

export default class AppProxy extends CoreProxy {

  static NAME = 'app';

  constructor(data) {
    super(AppProxy.NAME, assign({}, initialState, data));
  }
}

