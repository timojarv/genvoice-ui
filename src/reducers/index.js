import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import { FLUSH_STATE } from '../actions/types';

import auth from './auth';
import user from './user';
import loader from './loader';
import invoices from './invoices';
import { reducer as notifs } from 'redux-notifications';

const reducers = { form, auth, user, loader, notifs, invoices };

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    if(action.type === FLUSH_STATE) state = undefined;
    return appReducer(state, action);
};

export default rootReducer;