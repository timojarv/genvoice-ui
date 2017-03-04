import { ROOT_URL } from '.';
import { fetchUserData } from './user';
import { fetchInvoices } from './invoice'

import axios from 'axios';

import { actions as notifActions } from 'redux-notifications';
export const sendNotif = opts => notifActions.notifSend({ dismissAfter: 3000, ...opts });

function authorize(token = false) {
	token = token ? token : localStorage.getItem("token");
	return { headers: { Authorization: token }}
}

export function authorizedGet(route, token = false) {
    return authorizedRequest("GET", route, false, token);
}

export function authorizedPost(route, data, token = false) {
	return authorizedRequest("POST", route, data, token);
}

export function authorizedPut(route, data, token = false) {
	return authorizedRequest("PUT", route, data, token);
}

export const connectionError = dispatch => err => {
	if(!err.response || err.response.status === 404) {
		dispatch(sendNotif({ message: "Ei yhteyttä palvelimeen", kind: "danger" }));
	} else {
		return Promise.reject(err);
	}
};

export function authorizedRequest(method, route, data, token = false) {
	const url = `${ROOT_URL}/${route}`;
	return axios({
		method,
		url,
		data,
		...authorize(token)
	});
}

export function fetchAllData(token = false) {
    return dispatch =>
        dispatch(fetchUserData(token))
            .then(() => dispatch(fetchInvoices(token)));
}