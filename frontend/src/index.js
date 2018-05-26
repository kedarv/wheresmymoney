import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { loadCookie } from './utils/cookies';
import { loginFromJWT, registerAccessToken } from './actions/users';
import ReduxThunk from 'redux-thunk';
import apiService from './actions/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = configureStore();

const token = loadCookie('token');

if (token) store.dispatch(loginFromJWT(token));

ReactDOM.render((
	<Provider store={store}>
	  <BrowserRouter>
	    <App />
	  </BrowserRouter>
	</Provider>
), document.getElementById('root'));
registerServiceWorker();
