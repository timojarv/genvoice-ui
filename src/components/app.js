import React from 'react';
import TopBar from './top_bar';
import { Notifs } from 'redux-notifications';

import Loader from './loader';

export default function App(props) {
	return (
		<div id="app" className="container">
			<Notifs className="alert" transitionEnterTimeout={0} />
			<Loader />
			<TopBar />
			{props.children}
		</div>
	);
};