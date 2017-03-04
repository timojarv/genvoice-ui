import { authorizedPost, authorizedGet, sendNotif } from './helpers';
import { FETCH_INVOICES } from './types';
import { hashHistory } from 'react-router';
import { ROOT_URL } from '.';

export function saveInvoice(data) {
	return dispatch => 
		authorizedPost('invoices', data)
			.then(() => dispatch(fetchInvoices()))
            .then(() => {
                dispatch(sendNotif({ message: 'Lasku luotu', kind: 'success' }));
                hashHistory.push("/");
            });
}

export function fetchInvoices(token = false) {
    return dispatch => 
        authorizedGet('invoices', token)
            .then(response => dispatch({
                type: FETCH_INVOICES,
                payload: response.data.invoices.map(
                    invoice => ({ ...invoice, url: `${ROOT_URL}/invoices/${invoice._id}` })
                )
            }));
}