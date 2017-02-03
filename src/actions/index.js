import { RESTORE_DATA, AUTH_USER, DEAUTH_USER, FETCH_USER_DATA, UPDATE_USER_DATA, UPDATE_CONTACTS } from './types';
import axios from 'axios';
import { hashHistory } from 'react-router';

export * from './notification';
import * as notification from './notification';

const ROOT_URL = "http://192.168.1.7";

export function restoreData(form, data) {
	return {
		type: RESTORE_DATA[form],
		payload: data
	}
}

export function loginUser(email, password) {
	return dispatch => 
		axios.post(`${ROOT_URL}/login`, { email, password })
			.then(response => {
				const token = response.data.token;
				//Save token to localStorage
				localStorage.setItem("token", token);
				//Set state as auth'd
				dispatch({ type: AUTH_USER });
				//Fetch user data
				dispatch(fetchUserData(token));
				//Redirect to root
				hashHistory.push("/");
			});
}

export function logoutUser() {
	return dispatch => {
		localStorage.removeItem("token");
		dispatch({ type: DEAUTH_USER });
	};
}

export function fetchUserData(token) {
	return dispatch => {
		axios.get(`${ROOT_URL}/user`, authorize(token))
			.then(response => {
				dispatch(_fetchUserData(response.data));
				dispatch(updateContacts(response.data.user.contacts));
			});
	};
}

export function updateUserData(data) {
	return dispatch => {
		axios.put(`${ROOT_URL}/user`, data, authorize())
			.then(() => {
				dispatch(_fetchUserData(data));
				dispatch(notification.push("Tallennettu!", "done"));
			});
	};
}

export function addContact(formProps) {
	return dispatch => {
		authorizedPost("contacts", formProps).then(() => {
			dispatch(notification.push("Kontakti lisätty!", "done"));
			hashHistory.push("/contacts");
		});
	};
}

function _fetchUserData(data) {
	return {
		type: FETCH_USER_DATA,
		payload: data
	};
}

function updateContacts(contacts) {
	return {
		type: UPDATE_CONTACTS,
		payload: contacts
	};
}

function authorize(token = false) {
	token = token ? token : localStorage.getItem("token");
	return { headers: { Authorization: token }}
}

function authorizedPost(route, data) {
	return axios.post(`${ROOT_URL}/${route}`, data, authorize());
}