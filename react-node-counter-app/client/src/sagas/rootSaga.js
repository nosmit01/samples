import { all } from 'redux-saga/effects'
import { loginWatcherSaga } from './sessionSaga'
import { countWatcherSaga } from './countSaga'

export default function* rootSaga() {
  yield all([
    loginWatcherSaga(),
    countWatcherSaga()
  ])
}