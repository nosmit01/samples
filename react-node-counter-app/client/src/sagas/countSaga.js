import axios from 'axios'
import get from 'lodash/get'
import { updateCount } from '../redux/actions'
import { takeLatest, call, put } from 'redux-saga/effects'

function countApi(payload) {
  return axios.request({
    method: 'post',
    url: `http://localhost:3000/api/increment/${payload.count}`,
    // token should be saved in cookie, but using here because there is no logout, and
    // devs need to refresh to login screen
    headers: { 'Authorization': `Bearer ${payload.token}` }
  })
}

function* countEffectSaga(action) {
  try {
    let { data } = yield call(countApi, action.payload)
    yield put(updateCount(data))
  } catch (err) {
    const countErr = get(err.response, 'data.message', 'Something went wrong, please try again.')
    yield put(updateCount({ error: countErr }))
  }
}

export function* countWatcherSaga() {
  yield takeLatest('COUNT_WATCHER', countEffectSaga)
}