import { SHOW_LOADER, HIDE_LOADER } from './types';

export function showLoader(message = "") {
	return {
		type: SHOW_LOADER,
		payload: message
	};
}


export function hideLoader() {
	return {
		type: HIDE_LOADER
	};
}