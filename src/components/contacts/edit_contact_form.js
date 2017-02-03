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
        this.props.fetchUserData();
    }

    componentWillUnmount() {
        this.props.setActiveContact(undefined);
    }

    handleFormSubmit(formProps) {
        console.log("HERE");
        console.log(formProps);
        const id = this.props.params.id;
        this.props.updateContact(id, formProps);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <h2>Muokkaa kontaktia</h2>
                <ContactForm />
                <Link to="/contacts" className="btn btn-outline">Peruuta</Link>
                <button type="submit" className="btn">Tallenna</button>
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