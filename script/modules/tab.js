//==============================================================================
// Tab module
//==============================================================================

import objectAssign from 'object-assign';

//==============================================================================
// types

const TAB_CREATE = 'TAB_CREATE';
const TAB_REMOVE = 'TAB_REMOVE';
const TAB_SELECT = 'TAB_SELECT';

//==============================================================================
// actions

export const createTab = (name) => {
	return {
		type: TAB_CREATE,
		name: name
	}
}

export const removeTab = (name) => {
	return {
		type: TAB_REMOVE,
		name: name
	}
}

export const selectTab = (name, index) => {
	return {
		type:  TAB_SELECT,
		name:  name,
		index: index
	}
}

//==============================================================================
// reducer

const init = [];

export const tabReducer = (state = init, action) => {
	// コピーを生成する
	var tabs = state.slice();

	switch(action.type) {
	case TAB_CREATE:
		// すでに存在するキーだったら無視
		var isExist = false;
		tabs.forEach((v, i, a) => {
			if(v.name === action.name) {
				isExist = true;
			}
		})
		if(isExist) {
			return state;
		}

		tabs.push({
			name: action.name,
			selected: 0
		})
		return tabs;

	case TAB_REMOVE:
		return tabs.filter((v, i, a) => {
			if(v.name !== action.name) {
				return true;
			}
			return false;
		})

	case TAB_SELECT:
		return tabs.map((v, i, a) => {
			if(v.name === action.name) {
				return objectAssign({}, v, {
					selected: action.index
				})
			}
			return v;
		})

	default:
		return state;
	}
}
