import React from 'react';
import TopBar from './top_bar';
import Notification from './notification';

export default function App(props) {
	return (
		<div id="app" className="grid">
			<Notification />
			<TopBar />
			{props.children}
		</div>
	);
};