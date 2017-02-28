import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import { FLUSH_STATE } from '../actions/types';

import auth from './auth';
import user from './user';
import loader from './loader';
import { reducer as notifs } from 'redux-notifications';

const reducers = { form, auth, user, loader, notifs };

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    if(action.type === FLUSH_STATE) state = undefined;
    return appReducer(state, action);
};

export default rootReducer;