import ReactDOM from 'react-dom';
import AppFacade from './facade/AppFacade';
import React from 'react';
import Provider from './core/view/Provider';
import App from './view/App';
import './index.css';

let initialState = {
  app: {
    title: 'PMVC (PureMVC) - React',
    description: 'pmvc app build with react as the view layer',
  },
  counterGlobal: {
    count: 200
  }
};

if (typeof (Storage) !== 'undefined') {
  initialState = JSON.parse(window.localStorage.getItem('pmvc-react')) || initialState;
}

const app = AppFacade.getInstance('app');
app.startup(initialState);

ReactDOM.render(
  <Provider store={app}>
    <App />
  </Provider>,
  document.getElementById('root')
);
