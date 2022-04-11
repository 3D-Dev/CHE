import { all } from 'redux-saga/effects'
import userSagas from './sagas/User'
export default function* rootSaga() {
  yield all([
    userSagas(),
  ])
}
