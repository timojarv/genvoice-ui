import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';
import { required } from '../../validators';
import ContactForm from '../form/contact_form';

class NewContactForm extends Component {
    handleCreateContact(...props) {
        this.props.showLoader("Tallennetaan");
        this.props.addContact(...props).then(this.props.hideLoader);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleCreateContact.bind(this))}>
                <fieldset>
                    <legend>Lisää uusi kontakti</legend>
                    <ContactForm />
                </fieldset>
                <br /><br />
                <fieldset>
                    <button type="submit" className="button button-block button-primary">Tallenna</button>
                </fieldset>
            </form>
        );
    }
}

NewContactForm = reduxForm({
    form: 'contact',
    validate: required(["name", "address", "zip", "city", "country", "email"])
})(NewContactForm);

export default connect(null, actions)(NewContactForm);