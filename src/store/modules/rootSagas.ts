import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import company from './company/sagas';

export default function* rootSaga(): Generator {
  yield all([
    auth,
    company
  ]);
}
