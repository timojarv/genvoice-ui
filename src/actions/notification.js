import { PUSH_NOTIFICATION, POP_NOTIFICATION } from './types';

export function push(message, type = "error") {
	const notification = { message, type, id: Date.now() };
	return dispatch => {
		setTimeout(() => dispatch(pop(notification.id)), 3000);
		dispatch({
			type: PUSH_NOTIFICATION,
			payload: notification
		});
	};
}

function pop(id) {
	return {
		type: POP_NOTIFICATION,
		payload: id
	};
}