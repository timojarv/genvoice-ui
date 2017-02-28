import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import LabeledField from '../labeled_field';
import { SubmissionError } from 'redux-form';
import { required } from '../../validators';
import { Link } from 'react-router';

class Register extends Component {
	handleRegister({ email, password }) {
		this.props.showLoader("Rekisteröidään");
		return this.props.registerUser( email, password )
			.catch(err => {
				this.props.sendNotif({ message: "Rekisteröinti epäonnistui", kind: "danger" });
			})
			.then(this.props.hideLoader);
	}

	renderError(error) {
		return (
			<div className="alert alert-error">{error}</div>
		);
	}

	render() {
		const { error, handleSubmit, submitting } = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleRegister.bind(this))}>
				{error && this.renderError(error) }
				<fieldset>
					<legend>Rekisteröidy</legend>
					<LabeledField validate={required} name="email" label="Sähköposti" type="email" />
					<LabeledField validate={required} name="password" label="Salasana" type="password" />
					<button type="submit" className="button button-primary">Rekisteröidy</button>
				</fieldset>
			</form>
		);
	}
}

Register = reduxForm({
	form: 'register'
})(Register);

export default connect(null, actions)(Register);