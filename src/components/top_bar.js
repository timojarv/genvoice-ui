import React from 'react';
import { Link } from 'react-router';
import LogoutButton from './auth/logout_button';

export default function TopBar(props) {
	return (
		<nav className="top-bar">
			<Link className="brand" to="/">Genvoice</Link>
			<LogoutButton className="logout-btn btn-outline btn-small" />
		</nav>
	);
}