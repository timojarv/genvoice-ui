import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import LabeledField from '../labeled_field';

class InvoiceDetailsForm extends Component {
	render() {
		return (
			<div id="invoice-details" className="column-1">
				<fieldset>
					<legend>Laskun tiedot</legend>
					<LabeledField name="title" label="Otsikko" />
					<LabeledField name="term" label="Maksuehto" />
				</fieldset>
			</div>
		);
	}
}

InvoiceDetailsForm = reduxForm({
	form: 'invoice'
})(InvoiceDetailsForm);

export default InvoiceDetailsForm;