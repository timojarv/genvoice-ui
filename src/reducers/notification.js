import { PUSH_NOTIFICATION, POP_NOTIFICATION } from '../actions/types';

export default function notificationReducer(state = false, action) {
	switch(action.type) {
		case PUSH_NOTIFICATION:
			return action.payload;
		case POP_NOTIFICATION:
			if(state.id === action.payload) return false;
	}

	return state;
}