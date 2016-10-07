import ReactDOM from 'react-dom';
import AppFacade from './facade/AppFacade';
import './index.css';

let data = {
  app: {
    title: 'PMVC (PureMVC) - React',
    description: 'pmvc app build with react as the view layer'
  },
  counterGlobal:{
    count: 0
  },
  counterLocal:{
    count: 0
  }
};

if(typeof(Storage) !== 'undefined') {
  data = JSON.parse(localStorage.getItem('pmvc-react')) || data;
}


const initialState = data;
const app = AppFacade.getInstance('app');
if(typeof document !== 'undefined') {
  app.render = cb => {
    return ReactDOM.render(
      app.Component,
      document.getElementById('root'),
      cb
    );
  };
}


app.startup(initialState);
