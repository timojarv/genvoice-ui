import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import ContactForm from '../form/contact_form';
import BankForm from '../form/bank_form';

class UserForm extends Component {
	componentWillMount() {
		this.props.fetchUserData();
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.props.updateUserData)} >
				<div className="col-6">
					<h2>Omat tiedot</h2>
					<ContactForm />
				</div>
				<div className="col-6">
					<h2>Pankkitiedot</h2>
					<BankForm />
					<input type="submit" value="Tallenna" className="btn" />
				</div>
			</form>
		);
	}
}

UserForm = reduxForm({
	form: 'user'
})(UserForm);

const mapStateToProps = state => ({ initialValues: state.user.data });

export default connect(mapStateToProps, actions)(UserForm);