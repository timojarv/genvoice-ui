import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import LabeledField from '../labeled_field';
import { SubmissionError } from 'redux-form';
import { required } from '../../validators';
import { Link } from 'react-router';

class Login extends Component {
	handleLogin({ email, password }) {
		this.props.showLoader("Kirjaudutaan");
		return this.props.loginUser( email, password )
			.catch(err => {
				this.props.sendNotif({ message: "Kirjautuminen epäonnistui", kind: "danger" });
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
			<form onSubmit={handleSubmit(this.handleLogin.bind(this))}>
				{error && this.renderError(error) }
				<fieldset>
					<legend>Kirjaudu sisään</legend>
					<LabeledField validate={required} name="email" label="Sähköposti" type="email" />
					<LabeledField validate={required} name="password" label="Salasana" type="password" />
					<button type="submit" className="button button-primary">Kirjaudu</button>
					<Link to="/register" className="button button-text">Rekisteröidy</Link>
				</fieldset>
			</form>
		);
	}
}

Login = reduxForm({
	form: 'login'
})(Login);

export default connect(null, actions)(Login);