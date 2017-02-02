import React from 'react';
import { Link } from 'react-router';

export default function Menu(props) {
	return (
		<div className="menu">
			<Link to="/new" className="btn btn-outline">Luo uusi lasku</Link>
			<Link to="/contacts" className="btn btn-outline">Kontaktit</Link>
			<Link to="/account" className="btn btn-outline">Omat tiedot</Link>
		</div>
	);
}