import { FETCH_USER_DATA, SET_ACTIVE_CONTACT } from '../actions/types';

export default function userReducer(state = {}, action) {
	switch(action.type) {
		case FETCH_USER_DATA:
			return { ...state, ...action.payload.user };
		case SET_ACTIVE_CONTACT:
			return { ...state, activeContactId: action.payload }
	}

	return state;
}