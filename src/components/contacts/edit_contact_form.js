import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import * as actions from '../../actions';
import { required } from '../../validators';
import { activeContactSelector } from '../../selectors';
import ContactForm from '../form/contact_form';

class EditContactForm extends Component {
    componentWillMount() {
        const id = this.props.params.id;
        this.props.setActiveContact(id);
    }

    componentWillUnmount() {
        this.props.setActiveContact(undefined);
    }

    handleFormSubmit(formProps) {
        const id = this.props.params.id;
        this.props.showLoader("Tallennetaan");
        this.props.updateContact(id, formProps).then(this.props.hideLoader);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset>
                    <legend>Muokkaa kontaktia</legend>
                    <ContactForm />
                </fieldset>
                <br /><br />
                <fieldset className="button-group button-group-block">
                    <div className="button-group">
                        <Link to="/contacts" className="button">Peruuta</Link>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="button button-primary">Tallenna</button>
                    </div>
                </fieldset>
            </form>
        );
    }
}

EditContactForm = reduxForm({
    form: 'contact',
    validate: required(["name", "address", "zip", "city", "country", "email"])
})(EditContactForm);

const mapStateToProps = state => ({
    initialValues: activeContactSelector(state)
});

export default connect(mapStateToProps, actions)(EditContactForm);