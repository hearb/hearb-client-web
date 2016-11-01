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

		if(this.props.toasts[0].active) {
			this.timer = setTimeout(() => {
				inactivateToast();
			}, 5000);
		} else {
			popToast();
			activateToast();
		}
	}

	onClickClose() {
		if(this.timer) {
			clearTimeout(this.timer);
		}
		this.props.inactivateToast();
	}

	render() {
		const len = this.props.toasts.length;
		if(len > 0) {
			const {message, type, active} = this.props.toasts[0];

			const class_container = classnames('toast-container', {
				'active': active,
				'continue': len > 1
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
			return null;
		}
	}

	// After render() called
	componentDidUpdate(prevProps, prevState) {
		// リストが空の状態から登録された場合、
		// アニメーションのためにDOM生成後にpropsを変更する
		if(prevProps.toasts.length === 0) {
			setTimeout(() => {
				this.props.activateToast();
			}, 50)
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
