import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {pushToast} from '../modules/toast';


class PageIndex extends React.Component {
	constructor(props) {
		super(props);

		this.pushInfo = this.pushInfo.bind(this);
		this.pushSuccess = this.pushSuccess.bind(this);
		this.pushError = this.pushError.bind(this);
	}

	pushInfo() {
		this.props.pushToast('トーストテスト', 'info');
	}

	pushSuccess() {
		this.props.pushToast('トーストテスト(成功)', 'success');
	}

	pushError() {
		this.props.pushToast('トーストテスト(エラー)', 'error');
	}

	render() {
		return (
			<main className="page-index">
				<button onClick={this.pushInfo}>トースト</button>
				<button onClick={this.pushSuccess}>トースト(成功)</button>
				<button onClick={this.pushError}>トースト(エラー)</button>
			</main>
		)
	}
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		pushToast
	}, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PageIndex)
