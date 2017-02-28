import React from 'react';
import { Link } from 'react-router';

export default function Menu(props) {
	return (
		<nav className="menu">
			<ul>
			<li><Link to="/new" className="button">Luo uusi lasku</Link></li>
			<li><Link to="/contacts" className="button">Kontaktit</Link></li>
			<li><Link to="/account" className="button">Omat tiedot</Link></li>
			</ul>
		</nav>
	);
}