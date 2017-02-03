import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../../actions'

class ContactsView extends Component {
	componentWillMount() {
		this.props.fetchUserData();
	}

	renderContacts() {
		const contacts = this.props.contacts || [];
		return contacts.map(contact => {
			return <li key={contact._id}>{contact.name}</li>
		});
	}

	render() {
		return (
			<div className="contacts-view">
				<h2>Kontaktit</h2>
				<Link to="contacts/new" className="btn">Lisää uusi</Link>
				<ul>
					{this.renderContacts()}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({ contacts: state.user.contacts });

export default connect(mapStateToProps, actions)(ContactsView);