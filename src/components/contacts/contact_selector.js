import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import * as actions from '../../actions';

class ContactSelector extends Component {
    componentWillMount() {
		this.props.fetchUserData();
	}

    listContacts() {
        return this.props.contacts
            ? this.props.contacts.map(c => ( <option value={c._id} key={c._id}>{c.name}</option> ))
            : null;
    }

    render() {
        return (
            <div className="select">
                <Field name="recipient" component="select">
                    <option>Valitse kontakti</option>
                    {this.listContacts()}
                </Field>
            </div>
        );
    }
}


const mapStateToProps = state => ({ contacts: state.user.contacts });

export default connect(mapStateToProps, actions)(ContactSelector);