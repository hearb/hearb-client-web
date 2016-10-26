import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import reducer from '../modules/rootReducer';
import routes from '../routes';


const store = createStore(
	reducer,
	applyMiddleware(thunk)
)

const history = syncHistoryWithStore(browserHistory, store)


export default class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history} routes={routes} />
			</Provider>
		)
	}
}
