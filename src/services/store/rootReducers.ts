import {combineReducers} from 'redux';

import {core} from '@modules/auth/store/reducers';

export type ReducersType = 'auth';

const reducers = {
  core,
};

const rootReducers = combineReducers(reducers);

export default rootReducers;
