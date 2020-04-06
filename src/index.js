import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';

import 'antd/dist/antd.css'; 
import './index.scss';
import App from './App';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter basename="/">
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
        </FirebaseContext.Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
