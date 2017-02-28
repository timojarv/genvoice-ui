import React, { Component } from 'react';
import { FieldArray, reduxForm } from 'redux-form';

import LabeledField from '../labeled_field';

class ProductsSection extends Component {
	renderProducts({fields}) {
		return (
			<fieldset>
				<legend>Tuotteet</legend>
				<button type="button" className="button success" onClick={() => fields.push({})}>Lisää tuote</button>
				<ul className="products grid">
					{fields.map(this.renderProductForm.bind(this, fields))}
				</ul>
			</fieldset>
		);
	}

	renderProductForm(fields, member, index) {
		return (
			<li key={index} className="product-item row">
				<div className="column-1-3"><LabeledField name={`${member}.name`} label="Nimi / kuvaus" /></div>
				<div className="column-1-6"><LabeledField name={`${member}.price`} label="Kappalehinta" /></div>
				<div className="column-1-6"><LabeledField name={`${member}.tax`} label="Vero %" /></div>
				<div className="column-1-6"><LabeledField name={`${member}.amount`} label="Määrä" /></div>
				<div className="column-1-6"><LabeledField name={`${member}.unit`} label="Yksikkö" /></div>
				<div className="column-1"><button type="button" className="button error" onClick={() => fields.remove(index)}>
					Poista tuote
				</button></div>
			</li>
		);
	}

	render() {
		return (
			<div className="column-1"><FieldArray name="items" component={this.renderProducts.bind(this)} /></div>
		);
	}
}

export default ProductsSection;