// redux/reducer.ts
import { StateTypes, LocaleAction, ActionType } from './types';

const initialState: StateTypes = {
  locale: 'or',  // Default to English
  activeTab:2,
  managerTab:false,
};

const localeReducer = (state = initialState, action: any): StateTypes => {
  switch (action.type) {
    case ActionType.SET_LOCALE:
      return {
        ...state,
        locale: action.payload,  // Update the locale based on the action payload
      };
    default:
      return state;
  }
};

export default localeReducer;
