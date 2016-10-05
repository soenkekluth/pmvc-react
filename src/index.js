import ReactDOM from 'react-dom';
import AppFacade from './facade/app-facade';
import './index.css';
console.log(AppFacade);

const initialState = {
  app: {
    title: 'PMVC (PureMVC) - React',
    description: 'pmvc app build with react as the view layer'
  },
  counterGlobal:{
    count: 10
  },
  counterLocal:{
    count: 5
  }
};

const app = AppFacade.getInstance('app');

app.render = cb => {
  return ReactDOM.render(
    app.Component,
    document.getElementById('root'),
    cb
  );
};

app.startup(initialState);
