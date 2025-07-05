// redux/actions.ts
import { ActionType, LocaleAction } from './types';

export const setLocale = (locale: 'en' | 'am'|'or'): any => ({
  type: ActionType.SET_LOCALE,
  payload: locale,
});
