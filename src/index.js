import ReactDOM from 'react-dom';
import AppFacade from './facade/AppFacade';
import React from 'react';
import Provider from './core/Provider';
import App from './view/App';
import './index.css';

const initialState = {
  app: {
    title: 'PMVC (PureMVC) - React',
    description: 'pmvc app build with react as the view layer',
  },
  counterGlobal: {
    count: 200,
  }
};

// if (typeof (Storage) !== 'undefined') {
//   initialState = JSON.parse(window.localStorage.getItem('pmvc-react')) || initialState;
// }

const app = AppFacade.getInstance('app');
app.startup(initialState);

// app.render = cb => {
  // console.log('render');
  ReactDOM.render(
    <Provider store={app}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
// };


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
