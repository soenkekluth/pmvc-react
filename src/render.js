import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import App from './App';


const mu = ReactDOMServer.renderToStaticMarkup(<App title="huaaaaa" />);
console.log(mu);
