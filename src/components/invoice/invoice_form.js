import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import InvoiceDetailsForm from './invoice_details_form';
import SenderForm from './sender_form';
import RecipientForm from './recipient_form';
import ProductsSection from './products_section';

class InvoiceForm extends Component {
	constructor(props) {
		super(props);
		this.handleInvoiceSubmit = this.handleInvoiceSubmit.bind(this);
	}

	handleInvoiceSubmit(formProps) {
		console.log(formProps);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form id="invoice-form" onSubmit={handleSubmit(this.handleInvoiceSubmit)}>
				<h1>Luo uusi lasku</h1>
				<InvoiceDetailsForm />
				<SenderForm />
				<RecipientForm />
				<ProductsSection />
				<button type="submit" className="btn">Luo lasku</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'invoice'
})(InvoiceForm);