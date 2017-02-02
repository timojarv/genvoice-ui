import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
	handleSignup(formProps) {
		//Call AC to signup the user
		this.props.signupUser(formProps.email, formProps.password);
	}

	renderAlert() {
		if(this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>You truly are miserable!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	renderField({input, label, type, meta: { touched, error, warning }}) {
		return (
			<fieldset className="form-group">
					<label>{label}:</label>
					<input { ...input } type={type} className="form-control"/>
					{touched && error && <div className="error">{error}</div>}
			</fieldset>
		);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
				<form onSubmit={handleSubmit(this.handleSignup.bind(this))}>
					<Field type="email" label="Email" name="email" component={this.renderField} />
					<Field type="password" label="Password" name="password" component={this.renderField} />
					<Field type="password" label="Confirm Password" name="passwordConfirm" component={this.renderField} />
					{this.renderAlert()}
					<button type="submit" className="btn btn-primary">Sign Up</button>
				</form>
		);
	}
}

function validate(formProps) {
	const errors = {};

	if(formProps.password !== formProps.passwordConfirm) {
		errors.passwordConfirm = "Passwords do not match!";
	}

	if(!formProps.email) errors.email = "Please enter an email!"
		if(!formProps.password) errors.password = "Please enter a password!"

	return errors;
}

Signup = reduxForm({
	form: 'signup',
	validate
})(Signup);

const mapStateToProps = state => ({errorMessage: state.auth.error});

export default connect(mapStateToProps, actions)(Signup);