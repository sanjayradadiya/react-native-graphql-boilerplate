import {createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import rootReducers from './rootReducers';
import {reduxStorage} from './reduxStorage';

const persistConfig = {
  key: 'app-storage',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default {
  store,
  persistor,
};
