import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import {toastReducer as toasts} from './toast';
import {tabReducer as tabs} from './tab';

export default combineReducers({
	routing,
	tabs,
	toasts
})
