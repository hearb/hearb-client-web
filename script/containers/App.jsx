import React from 'react';

import Header from './Header';
import Toast from './Toast';
import {Tab, ReduxTabBar as TabBar} from './Tab';

export default class App extends React.Component {
	render() {
		return (
			<div className="app">
				<Header />
				{this.props.children}
				<TabBar name="menu">
					<Tab icon="home" />
					<Tab icon="grade" text="favorite" />
					<Tab text="help" />
				</TabBar>
				<Toast />
			</div>
		)
	}
}
