import { RESTORE_DATA, AUTH_USER, FLUSH_STATE, FETCH_USER_DATA, UPDATE_USER_DATA, SET_ACTIVE_CONTACT, SHOW_LOADER, HIDE_LOADER } from './types';
import axios from 'axios';
import { hashHistory } from 'react-router';

import { actions as notifActions } from 'redux-notifications';
export const sendNotif = opts => notifActions.notifSend({ dismissAfter: 3000, ...opts });

const ROOT_URL = "https://genvoice.timojarv.com";

export function loginUser(email, password) {
	return dispatch => 
		axios.post(`${ROOT_URL}/login`, { email, password })
			.then(authenticateUser(dispatch))
			.catch(connectionError(dispatch));
}

export function logoutUser() {
	return dispatch => {
		localStorage.removeItem("token");
		dispatch({ type: FLUSH_STATE });
	};
}

export function registerUser(email, password) {
	return dispatch => 
		axios.post(`${ROOT_URL}/user/new`, { email, password })
			.then(authenticateUser(dispatch))
			.catch(connectionError(dispatch));
}

const authenticateUser = dispatch => response => {
	const token = response.data.token;
	//Save token to localStorage
	localStorage.setItem("token", token);
	//Set state as auth'd
	dispatch({ type: AUTH_USER });
	//Redirect to root
	hashHistory.push("/");
	dispatch(sendNotif({ message: "Tervetuloa", kind: "success" }));
	//Fetch user data
	return dispatch(fetchUserData(token));
}

export function checkAuthentication() {
	return dispatch => {
		dispatch(showLoader());
		const logout = () => dispatch(logoutUser());
		const token = localStorage.getItem("token");
		if(!token) return logout();
		dispatch(fetchUserData(token))
			.catch(logout)
			.then(() => dispatch(hideLoader()));
	};
}

export function fetchUserData(token) {
	return dispatch =>
		axios.get(`${ROOT_URL}/user`, authorize(token))
			.then(response => dispatch(_fetchUserData(response.data)));
}

export function updateUserData(data) {
	return dispatch => 
		axios.put(`${ROOT_URL}/user`, data, authorize())
			.then(() => {
				dispatch(_fetchUserData(data));
				dispatch(sendNotif({ message: "Tallennettu", kind: "success" }));
			})
			.catch(connectionError(dispatch));
}

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

export function createInvoice(data) {
	return dispatch => {
		authorizedPost('', data)
			.then(response => {
				window.open(`${ROOT_URL}/${response.data.filename}` ,"_blank");
			});
	};
}


export function showLoader(message = "") {
	return {
		type: SHOW_LOADER,
		payload: message
	};
}


export function hideLoader() {
	return {
		type: HIDE_LOADER
	};
}

function _fetchUserData(data) {
	return dispatch => {
		dispatch({
			type: FETCH_USER_DATA,
			payload: data
		});
		return Promise.resolve();
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
		dispatch(sendNotif({ message: "Ei yhteyttä palvelimeen", kind: "danger" }));
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