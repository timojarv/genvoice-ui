import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import InvoiceDetailsForm from './invoice_details_form';
import SenderForm from './sender_form';
import RecipientForm from './recipient_form';
import ProductsSection from './products_section';

import * as actions from '../../actions';
import { recipientSelector, userDetailsSelector } from '../../selectors';

class InvoiceForm extends Component {
	constructor(props) {
		super(props);
		this.handleInvoiceSubmit = this.handleInvoiceSubmit.bind(this);
	}

	handleInvoiceSubmit(formProps) {
		console.log(formProps);
		this.props.createInvoice(formProps);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form id="invoice-form" onSubmit={handleSubmit(this.handleInvoiceSubmit)}>
				<h1>Luo uusi lasku</h1>
				<div className="row">
					<InvoiceDetailsForm />
				</div>
				<div className="row">
					<RecipientForm />
				</div>
				<div className="row">
					<ProductsSection />
				</div>
				<br /><br />
				<fieldset>
					<button type="submit" className="button button-primary button-block">Luo lasku</button>
				</fieldset>
			</form>
		);
	}
}

InvoiceForm = reduxForm({
	form: 'invoice'
})(InvoiceForm);

const mapStateToProps = state => ({
	recipient: recipientSelector(state),
	sender: userDetailsSelector(state)
});

export default connect(mapStateToProps, actions)(InvoiceForm);