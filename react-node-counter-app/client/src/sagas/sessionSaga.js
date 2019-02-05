import axios from 'axios'
import get from 'lodash/get'
import { updateProfile } from '../redux/actions'
import { takeLatest, call, put } from 'redux-saga/effects'

function loginApi(authParams) {
  return axios.request({
    method: 'post',
    url: 'http://localhost:3000/api/auth',
    data: authParams
  })
}

function* loginEffectSaga(action) {
  try {
    let { data } = yield call(loginApi, action.payload)
    yield put(updateProfile(data))
  } catch (err) {
    const authErr = get(err.response, 'data.message', 'Something went wrong, please try again.')
    yield put(updateProfile({ error: authErr }))
  }
}

export function* loginWatcherSaga() {
  yield takeLatest('LOGIN_WATCHER', loginEffectSaga)
}