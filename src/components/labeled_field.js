import React from 'react';
import { Field } from 'redux-form';

const renderField = ({input, label, type, meta: { touched, error }}) => (
	<div>
		<label>{label}</label>
		<input {...input}
			//placeholder={label}
			type={type}
			className={(touched && error) ? "form-input error" : "form-input"}
		/>
	</div>
);

export default function LabeledField(props) {
	return (
		<Field
			{ ...props }
			label={props.label}
			name={props.name}
			type={props.type || "text"}
			component={renderField}
		/>
	);
}