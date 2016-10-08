import ReactDOM from 'react-dom';
import AppFacade from './facade/AppFacade';
import React from 'react';
import Provider from './core/Provider';
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


app.render = cb => {
  return ReactDOM.render(
    <Provider facade={app}>
      {app.Component}
    </Provider>,
    document.getElementById('root'),
    cb
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
