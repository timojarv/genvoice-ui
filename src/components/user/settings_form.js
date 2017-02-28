import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { required } from '../../validators';
import { userDetailsSelector } from '../../selectors';

import ContactForm from '../form/contact_form';
import BankForm from '../form/bank_form';

class UserForm extends Component {
	handleSettingsUpdate(...props) {
		this.props.showLoader("Tallennetaan");
		this.props.updateUserData(...props)
			.then(this.props.hideLoader);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form className="row" onSubmit={handleSubmit(this.handleSettingsUpdate.bind(this))} >
				<div className="column-1-2">
					<fieldset>
						<legend>Omat tiedot</legend>
						<ContactForm />
					</fieldset>
				</div>
				<div className="column-1-2">
					<fieldset>
						<legend>Pankkitiedot</legend>
						<BankForm />
					</fieldset>
					<br /><br />
					<fieldset>
						<button type="submit" className="button button-block button-primary">Tallenna</button>
					</fieldset>
				</div>
			</form>
		);
	}
}

UserForm = reduxForm({
	form: 'user',
	validate: required(["email"])
})(UserForm);

const mapStateToProps = state => ({ initialValues: userDetailsSelector(state) });

export default connect(mapStateToProps, actions)(UserForm);