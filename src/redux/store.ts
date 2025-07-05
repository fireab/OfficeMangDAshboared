// redux/store.ts
import { createStore } from 'redux';
import localeReducer from './reducer';

const store = createStore(localeReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
