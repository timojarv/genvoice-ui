import { FETCH_USER_DATA } from './types';
import { authorizedPut, authorizedGet, connectionError, sendNotif } from './helpers';


export function fetchUserData(token) {
	return dispatch =>
		authorizedGet("user", token)
			.then(response => dispatch(_fetchUserData(response.data)));
}

export function updateUserData(data) {
	return dispatch => 
		authorizedPut(`user`, data)
			.then(() => {
				dispatch(_fetchUserData({ user: data }));
				dispatch(sendNotif({ message: "Tallennettu", kind: "success" }));
			})
			.catch(connectionError(dispatch));
}


function _fetchUserData(data) {
	return {
		type: FETCH_USER_DATA,
		payload: data
	};
}