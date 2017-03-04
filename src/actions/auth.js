import { AUTH_USER, FLUSH_STATE } from './types';
import { connectionError, sendNotif, fetchAllData } from './helpers';
import { showLoader, hideLoader } from './loader';
import { ROOT_URL } from '.';
import { hashHistory } from 'react-router';

import axios from 'axios';



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
		axios.post(`${ROOT_URL}/user`, { email, password })
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
	return dispatch(fetchAllData(token));
}

export function checkAuthentication() {
	return dispatch => {
		dispatch(showLoader());
		const logout = () => dispatch(logoutUser());
		const token = localStorage.getItem("token");
		if(!token) return logout();
		dispatch(fetchAllData(token))
			.catch(console.log)//logout)
			.then(() => dispatch(hideLoader()));
	};
}
