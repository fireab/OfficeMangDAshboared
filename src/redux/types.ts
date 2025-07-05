// redux/types.ts
export interface StateTypes {
    locale: 'en' | 'am'|'or'; // Amharic ('am') or English ('en'),
    activeTab:number,
    managerTab:boolean,
  }
  
  export enum ActionType {
    SET_LOCALE = 'SET_LOCALE',
  }
  
  interface SetLocaleAction {
    type: ActionType.SET_LOCALE;
    payload: 'en' | 'am' | 'or';  // Payload will be either 'en' or 'am'
  }
  
  export type LocaleAction = SetLocaleAction;
  