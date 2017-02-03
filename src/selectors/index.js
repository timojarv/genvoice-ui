import { createSelector } from 'reselect';

export const contactListSelector = state => (state.user.contacts || []);
export const ActiveContactIdSelector = state => state.user.activeContactId;

export const activeContactSelector = createSelector(
    contactListSelector,
    ActiveContactIdSelector,
    (contacts, id) => contacts.reduce((acc, contact) => (contact._id === id) ? contact : acc, undefined)
);

export const userDetailsSelector = state => state.user.email ? state.user : undefined;