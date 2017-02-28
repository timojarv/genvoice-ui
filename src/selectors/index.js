import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';

export const contactListSelector = state => (state.user.contacts || []);
export const activeContactIdSelector = state => state.user.activeContactId;

export const invoiceFormSelector = formValueSelector('invoice');

export const activeContactSelector = createSelector(
    contactListSelector,
    activeContactIdSelector,
    (contacts, id) => contacts.reduce((acc, contact) => (contact._id === id) ? contact : acc, undefined)
);

export const userDetailsSelector = state => state.user.email ? state.user : undefined;

export const recipientIdSelector = state => invoiceFormSelector(state, 'contact');

export const recipientSelector = createSelector(
    contactListSelector,
    recipientIdSelector,
    (contacts, id) => contacts.reduce((acc, contact) => (contact._id === id) ? contact : acc, undefined)
);