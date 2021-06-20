import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';

const Main = () => <App />;

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
