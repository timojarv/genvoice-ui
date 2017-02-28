import { SHOW_LOADER, HIDE_LOADER } from '../actions/types';

const initialState = { active: false, message: "" };

export default function LoaderReducer(state = initialState, action) {
    switch(action.type) {
        case SHOW_LOADER:
            return { active: true, message: action.payload };
        case HIDE_LOADER:
            return initialState;
    }

    return state;
}