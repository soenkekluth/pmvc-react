import ReactDOM from 'react-dom';
import AppFacade from './facade/app-facade';
import './index.css';


const initialState = {
  title: 'PMVC (PureMVC) - React',
  description: 'pmvc app build with react as the view layer'
};


const App = AppFacade.getInstance('app').startup(initialState);

ReactDOM.render(
  App.Component,
  document.getElementById('root')
);
