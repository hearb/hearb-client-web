//==============================================================================
// Toast module
//==============================================================================

//==============================================================================
// types

const TOAST_PUSH       = 'TOAST_PUSH';
const TOAST_POP        = 'TOAST_POP';
const TOAST_ACTIVATE   = 'TOAST_ACTIVATE';
const TOAST_INACTIVATE = 'TOAST_INACTIVATE';

//==============================================================================
// actions

export const popToast = () => {
	return {
		type: TOAST_POP
	}
}

export const pushToast = (message, type) => {
	return {
		type: TOAST_PUSH,
		message: message,
		message_type: type
	}
}

export const activateToast = () => {
	return {
		type: TOAST_ACTIVATE
	}
}

export const inactivateToast = () => {
	return {
		type: TOAST_INACTIVATE
	}
}

//==============================================================================
// reducer

const init = [];

export const toastReducer = (state = init, action) => {
	// stateのコピーをつくる
	var toasts = state.slice();

	switch(action.type) {
	case TOAST_PUSH:
		toasts.push({
			message: action.message,
			type:    action.message_type,
			active:  false
		});
		return toasts;

	case TOAST_POP:
		if(toasts.length > 0) {
			// queueなので先頭を削除
			toasts.shift();
		}
		return toasts;

	case TOAST_ACTIVATE:
		if(toasts.length > 0) {
			toasts[0].active = true;
		}
		return toasts;

	case TOAST_INACTIVATE:
		if(toasts.length > 0) {
			toasts[0].active = false;
		}
		return toasts;

	default:
		return state;
	}
}
