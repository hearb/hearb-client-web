import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import objectAssign from 'object-assign';

import {createTab, removeTab, selectTab} from '../modules/tab';


export class Tab extends React.Component {
	static get propTypes() {
		return {
			icon:      React.PropTypes.string,
			text:      React.PropTypes.string,
			selected:  React.PropTypes.bool,
			selectTab: React.PropTypes.func
		}
	}

	render() {
		const {icon, text, selected, selectTab} = this.props;

		const classname = classnames('tab', {
			'selected': selected
		})

		return (
			<li className={classname} onClick={selectTab}>
				<div className="tab-indicator"></div>
				<div className="tab-content">
					<i className="material-icons">{icon}</i>
					<div className="tab-text">{text}</div>
				</div>
			</li>
		)
	}
}


class TabBar extends React.Component {
	static get propTypes() {
		return {
			name:      React.PropTypes.string,
			tabs:      React.PropTypes.array,
			createTab: React.PropTypes.func,
			removeTab: React.PropTypes.func,
			selectTab: React.PropTypes.func
		}
	}

	constructor(props) {
		super(props);

		const {name, createTab} = this.props;
		createTab(name);
	}

	componentWillUnmount() {
		const {name, removeTab} = this.props;
		removeTab(name);
	}

	render() {
		const {name, tabs, selectTab} = this.props;

		const id = 'tab-' + name;

		// state.tabsから、TabBarのnameに一致する要素を取り出す
		const tab = tabs.find((v, i, a) => {
			if(v.name === name) {
				return true;
			}
			return false;
		})
		var selected = null;
		if(tab) {
			selected = tab.selected;
		}

		const children = this.props.children.map((v, i, a) => {
			const props = objectAssign({}, v.props, {
				selected:  i === selected,
				selectTab: () => { selectTab(name, i); }
			})

			return objectAssign({}, v, {
				props: props
			})
		})

		return (
			<nav className="tab-bar" id={id}>
				<ul>
					{children}
				</ul>
			</nav>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		tabs: state.tabs
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		createTab,
		removeTab,
		selectTab
	}, dispatch)
}

export const ReduxTabBar = connect(
	mapStateToProps,
	mapDispatchToProps
)(TabBar)
