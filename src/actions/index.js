import { RESTORE_DATA, AUTH_USER, FLUSH_STATE, FETCH_USER_DATA, UPDATE_USER_DATA, SET_ACTIVE_CONTACT } from './types';
import axios from 'axios';
import { hashHistory } from 'react-router';

export * from './notification';
import * as notification from './notification';

const ROOT_URL = "http://genvoice.timojarv.com";

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
			})
			.catch(connectionError(dispatch));
}

export function logoutUser() {
	return dispatch => {
		localStorage.removeItem("token");
		notification.push("Kirjauduttu ulos", "info");
		dispatch({ type: FLUSH_STATE });
	};
}

export function fetchUserData(token) {
	return dispatch => {
		axios.get(`${ROOT_URL}/user`, authorize(token))
			.then(response => {
				dispatch(_fetchUserData(response.data));
			});
	};
}

export function updateUserData(data) {
	return dispatch => {
		axios.put(`${ROOT_URL}/user`, data, authorize())
			.then(() => {
				dispatch(_fetchUserData(data));
				dispatch(notification.push("Tallennettu", "done"));
			})
			.catch(connectionError(dispatch));
	};
}

export function addContact(formProps) {
	return dispatch => {
		authorizedPost("contacts", formProps).then(() => {
			dispatch(notification.push("Kontakti lisätty", "done"));
			hashHistory.push("/contacts");
		})
		.catch(connectionError(dispatch))
		.catch(err => dispatch(notification.push("Kontaktin lisääminen epäonnistui")));
	};
}

export function updateContact(id, formProps) {
	return dispatch => {
		authorizedPut(`contacts/${id}`, formProps)
			.then(() => {
				dispatch(notification.push("Kontakti päivitetty", "done"));
				hashHistory.push("/contacts");
			})
			.catch(connectionError(dispatch))
			.catch(err => dispatch(notification.push("Kontaktin päivittäminen epäonnistui")));
	};
}

export function setActiveContact(id) {
	return {
		type: SET_ACTIVE_CONTACT,
		payload: id
	};
}

function _fetchUserData(data) {
	return {
		type: FETCH_USER_DATA,
		payload: data
	};
}

function authorize(token = false) {
	token = token ? token : localStorage.getItem("token");
	return { headers: { Authorization: token }}
}

function authorizedPost(route, data, token = false) {
	return authorizedRequest("POST", route, data, token);
}

function authorizedPut(route, data, token = false) {
	return authorizedRequest("PUT", route, data, token);
}

const connectionError = dispatch => err => {
	if(!err.response || err.response.status === 404) {
		dispatch(notification.push("Ei yhteyttä palvelimeen"));
	} else {
		return Promise.reject(err);
	}
};

function authorizedRequest(method, route, data, token = false) {
	const url = `${ROOT_URL}/${route}`;
	return axios({
		method,
		url,
		data,
		...authorize(token)
	});
}