import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import LabeledField from '../labeled_field';
import { SubmissionError } from 'redux-form';
import { required } from '../../validators';

class Login extends Component {
	handleLogin({ email, password }) {
		return this.props.loginUser( email, password ).catch(err => {
			this.props.push("Kirjautuminen epäonnistui!");
			//throw new SubmissionError({ _error: "Kirjautuminen epäonnistui!" });
		});
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
				<h1>Kirjaudu sisään</h1>
				<LabeledField validate={required} name="email" label="Sähköposti" type="email" />
				<LabeledField validate={required} name="password" label="Salasana" type="password" />
				<button type="submit" className="btn btn-primary">Kirjaudu</button>
			</form>
		);
	}
}

Login = reduxForm({
	form: 'login'
})(Login);

export default connect(null, actions)(Login);