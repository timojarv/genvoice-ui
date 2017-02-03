import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';
import { required } from '../../validators';
import ContactForm from '../form/contact_form';

class NewContactForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.props.addContact)}>
                <h2>Lisää uusi kontakti</h2>
                <ContactForm />
                <button type="submit" className="btn">Tallenna</button>
            </form>
        );
    }
}

NewContactForm = reduxForm({
    form: 'contact',
    validate: required(["name", "address", "zip", "city", "country", "email"])
})(NewContactForm);

export default connect(null, actions)(NewContactForm);