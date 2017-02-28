import React, { Component } from 'react';
import { FormSection, Field, reduxForm } from 'redux-form';

import ContactForm from '../form/contact_form';
import BankForm from '../form/bank_form';

class SenderForm extends Component {
	render() {
		return (
			<div className="column-1-2">
			<FormSection name="sender" id="sender-form">
				<fieldset>
					<legend>Lähettäjä</legend>
					<ContactForm dataSet="sender" />
					<h4>Pankkitiedot</h4>
					<BankForm />
				</fieldset>
			</FormSection>
			</div>
		);
	}
}

/*SenderForm = reduxForm({
	form: 'sender'
})(SenderForm);*/

export default SenderForm;