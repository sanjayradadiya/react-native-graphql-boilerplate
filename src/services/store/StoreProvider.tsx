import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {ReducersType} from './rootReducers';

export const appDispatch = store.dispatch;
export const getState = (stateName: ReducersType) =>
  store.getState()[stateName];

export default function StoreProvider({children}) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}
