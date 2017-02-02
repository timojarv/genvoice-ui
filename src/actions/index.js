import { RESTORE_DATA, AUTH_USER, DEAUTH_USER, FETCH_USER_DATA, UPDATE_USER_DATA } from './types';
import axios from 'axios';
import { hashHistory } from 'react-router';

export *  from './notification';

const ROOT_URL = "http://localhost";

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
			.then(response => dispatch(fetchData(response.data)));
	};
}

export function updateUserData(data) {
	return dispatch => {
		axios.put(`${ROOT_URL}/user`, data, authorize())
			.then(response => dispatch(fetchData(data)));
	};
}

function fetchData(data) {
	return {
		type: FETCH_USER_DATA,
		payload: data
	};
}

function authorize(token = false) {
	token = token ? token : localStorage.getItem("token");
	return { headers: { Authorization: token }}
}