import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import { FLUSH_STATE } from '../actions/types';

import { restoreSender, restoreRecipient } from './restore';
import auth from './auth';
import user from './user';
import notification from './notification';

const reducers = { form, auth, user, notification };

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    if(action.type === FLUSH_STATE) state = undefined;
    return appReducer(state, action);
};

export default rootReducer;