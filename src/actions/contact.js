import { SET_ACTIVE_CONTACT } from './types';
import { authorizedPost, authorizedPut, connectionError, sendNotif } from './helpers';
import { fetchUserData } from './user';
import { hashHistory } from 'react-router';

export function addContact(formProps) {
	return dispatch =>
		authorizedPost("contacts", formProps).then(() => {
			dispatch(sendNotif({ message: "Kontakti lisätty", kind: "success" }))
			dispatch(fetchUserData());
			hashHistory.push("/contacts");
		})
		.catch(connectionError(dispatch))
		.catch(err => dispatch(sendNotif({ message: "Kontaktin lisääminen epäonnistui", kind: "danger" })));
}

export function updateContact(id, formProps) {
	return dispatch => 
		authorizedPut(`contacts/${id}`, formProps)
			.then(() => {
				dispatch(sendNotif({ message: "Kontakti päivitetty", kind: "success" }));
				dispatch(fetchUserData());
				hashHistory.push("/contacts");
			})
			.catch(connectionError(dispatch))
			.catch(err => dispatch(sendNotif({ message: "Kontaktin päivittäminen epäonnistui", kind: "danger" })));
}

export function setActiveContact(id) {
	return {
		type: SET_ACTIVE_CONTACT,
		payload: id
	};
}