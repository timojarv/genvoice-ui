/* Styles */
require("../public/siimple.min.css");
require("../public/style.css");

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import App from './components/app';
import Parent from './components/parent';
import Menu from './components/menu';
import InvoiceForm from './components/invoice/invoice_form';
import ContactsView from './components/contacts/contacts_view';
import AccountSettings from './components/user/account_settings';
import Authenticated from './components/auth/require_auth';
import LoginForm from './components/auth/login_form';
import NewContactForm from './components/contacts/new_contact_form';
import EditContactForm from './components/contacts/edit_contact_form';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnchancers(
	applyMiddleware(thunk)
));

if(localStorage.getItem("token")) store.dispatch({ type: AUTH_USER });

ReactDOM.render(
	<Provider store={store} >
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Authenticated(Menu)} />
				<Route path="/new" component={Authenticated(InvoiceForm)} />
				<Route path="/contacts" component={Authenticated(Parent)}>
					<IndexRoute component={ContactsView} />
					<Route path="new" component={NewContactForm} />
					<Route path=":id" component={EditContactForm} />
				</Route>
				<Route path="/account" component={Authenticated(AccountSettings)} />
				<Route path="/login" component={LoginForm} />
			</Route>
		</Router>
	</Provider>,
	document.querySelector("#root")
);