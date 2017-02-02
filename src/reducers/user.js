import { FETCH_USER_DATA } from '../actions/types';

export default function userReducer(state = {}, action) {
	switch(action.type) {
		case FETCH_USER_DATA:
			return { data: action.payload.user };
	}

	return state;
}