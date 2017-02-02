import React, { Component } from 'react';
import { Link } from 'react-router';

class ContactsView extends Component {
	render() {
		return (
			<div className="contacts-view">
				<Link to="contacts/new" className="btn">Lisää kontakti</Link>
			</div>
		);
	}
}

export default ContactsView;