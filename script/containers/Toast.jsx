import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {popToast, activateToast, inactivateToast} from '../modules/toast';


class Toast extends React.Component {
	static get propTypes() {
		return {
			toasts:          React.PropTypes.array,
			popToast:        React.PropTypes.func,
			activateToast:   React.PropTypes.func,
			inactivateToast: React.PropTypes.func
		}
	}

	constructor(props) {
		super(props);

		this.timer = null;
		this.onTransitionEnd = this.onTransitionEnd.bind(this);
		this.onClickClose = this.onClickClose.bind(this);
	}

	onTransitionEnd() {
		const {popToast, activateToast, inactivateToast} = this.props;
		const toast = this.props.toasts[0];

		if(toast.active) {
			this.timer = setTimeout(() => {
				inactivateToast();
			}, toast.expires_in);
		} else {
			popToast();
			activateToast();
		}
	}

	onClickClose() {
		if(this.timer) {
			clearTimeout(this.timer);
			delete this.timer;
		}
		this.props.inactivateToast();
	}

	render() {
		const len = this.props.toasts.length;
		if(len > 0) {
			const {message, type, active} = this.props.toasts[0];

			const class_container = classnames('toast-container', {
				'active': active || len > 1
			})

			const class_toast = classnames('toast', type, {
				'closing': !active && len > 1
			});

			return (
				<div
					className={class_container}
					onTransitionEnd={this.onTransitionEnd}>
					<div className={class_toast}>
						<div className="toast-text">{message}</div>
						<i className="material-icons" onClick={this.onClickClose}>close</i>
					</div>
				</div>
			)
		} else {
			return (
				<div className="toast-container"></div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		toasts: state.toasts
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		popToast,
		activateToast,
		inactivateToast
	}, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Toast)
