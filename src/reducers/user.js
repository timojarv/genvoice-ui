import { FETCH_USER_DATA, UPDATE_CONTACTS } from '../actions/types';

export default function userReducer(state = {}, action) {
	switch(action.type) {
		case FETCH_USER_DATA:
			return { ...state, data: action.payload.user };
		case UPDATE_CONTACTS:
			return { ...state, contacts: action.payload}
	}

	return state;
}