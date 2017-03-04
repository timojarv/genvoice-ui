import React, { Component } from 'react';

import ContactSelector from '../contacts/contact_selector';

class RecipientForm extends Component {
	render() {
		return (
			<div className="column-1">
				<fieldset>
					<legend>Vastaanottaja</legend>
					<ContactSelector />
				</fieldset>
			</div>
		);
	}
}

/*RecipientForm = reduxForm({
	form: 'recipient'
})(RecipientForm);*/

export default RecipientForm;