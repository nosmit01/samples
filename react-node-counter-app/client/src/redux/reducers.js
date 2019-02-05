import get from 'lodash/get'

const initialState = {
  user: {},
  token: null,
  isLoggingIn: false,
  loginError: '',
  count: 0,
}

export default function (state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: get(action.payload, 'user', {}),
        // token should be saved in cookie, but using here because there is no logout, and
        // devs need to refresh to login screen
        token: get(action.payload, 'token', null),
        isLoggingIn: false,
        loginError: get(action.payload, 'error', ''),
      }

    case 'SET_LOGGING_IN':
      return {
        ...state,
        isLoggingIn: true
      }

    case 'UPDATE_COUNT':
      return {
        ...state,
        count: get(action.payload, 'count', state.count),
      }

    default:
      return state
  }
}