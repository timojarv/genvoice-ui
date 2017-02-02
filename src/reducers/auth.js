import { AUTH_USER, DEAUTH_USER } from '../actions/types';

export default function authReducer(state = { authenticated: false }, action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, authenticated: true }
		case DEAUTH_USER:
			return { ...state, authenticated: false }
	}

	return state;
}