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
				<i className="material-icons">{icon}</i>
				<div className="tab-text">{text}</div>
			</li>
		)
	}
}


class TabList extends React.Component {
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

		// state.tabsから、TabListのnameに一致する要素を取り出す
		const tab = tabs.find((v, i, a) => {
			if(v.name === name) {
				return true;
			}
			return false;
		})
		if(tab) {
			const selected = tab.selected;

			const children = this.props.children.map((v, i, a) => {
				const props = objectAssign({}, v.props, {
					selected:  i === selected,
					selectTab: () => { selectTab(name, i); }
				})

				return objectAssign({}, v, {
					props: props
				})
			})

			// インジケータの幅と位置
			const indicator_style = {
				width: (100 / children.length) + '%',
				left:  selected * (100 / children.length) + '%'
			}

			return (
				<nav className="tab-list" id={id}>
					<div className="tab-bar">
						<div
							className="tab-indicator"
							style={indicator_style}></div>
					</div>
					<ul>
						{children}
					</ul>
				</nav>
			)
		} else {
			return (
				<nav className="tab-list" id={id}></nav>
			)
		}
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

export const ReduxTabList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TabList)
