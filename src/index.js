import ReactDOM from 'react-dom';
import AppFacade from './facade/AppFacade';
import React from 'react';
import Provider from './core/Provider';
import App from './view/App';
import AppMediator from './view/AppMediator';
import './index.css';

const initialState = {
  app: {
    title: 'PMVC (PureMVC) - React',
    description: 'pmvc app build with react as the view layer',
  },
  counterGlobal: {
    count: 200,
  },
  counterLocal: {
    count: 100,
  },
};

// if (typeof (Storage) !== 'undefined') {
//   initialState = JSON.parse(window.localStorage.getItem('pmvc-react')) || initialState;
// }

const app = AppFacade.getInstance('app');

app.render = cb => {
  ReactDOM.render(
    <Provider facade={app} store={app.state}>
      <App key="app" Mediator={AppMediator} />
    </Provider>,
    document.getElementById('root')
  );
};

app.startup(initialState);

// const app2 = AppFacade.getInstance('app2');
// app2.render = cb => {
//   return ReactDOM.render(
//     <Provider facade={app2}>
//       {app2.Component}
//     </Provider>,
//     document.getElementById('root2'),
//     cb
//   );
// };
// app2.startup(initialState);
