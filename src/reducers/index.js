import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';

import { restoreSender, restoreRecipient } from './restore';
import auth from './auth';
import user from './user';
import notification from './notification';

const reducers = { form, auth, user, notification };

export default combineReducers(reducers);