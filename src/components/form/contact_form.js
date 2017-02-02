import React from 'react';
import LabeledField from '../labeled_field';
/*
	handleRestore() {
		const dataSet = this.props.dataSet;
		const data = localStorage.getItem(dataSet);
		this.props.restoreData(dataSet, JSON.parse(data));
	}

	handleSave() {
		const dataSet = this.props.dataSet;
		const data = this.props.form[dataSet].values;
		localStorage.setItem(dataSet, JSON.stringify(data));
	}
*/
export default function ContactForm() {
	return (
		<div className="contact-form">
			<LabeledField name="name" label="Nimi" />
			<LabeledField name="address" label="Osoite" />
			<LabeledField name="zip" label="Postinumero" />
			<LabeledField name="city" label="Paikkakunta" />
			<LabeledField name="country" label="Maa" />
			<LabeledField name="email" label="Sähköposti" />
			<LabeledField name="business_id" label="Y-tunnus" />
		</div>
	);
}