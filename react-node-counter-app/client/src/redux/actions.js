export function loginWatcher(authParams) {
  return { type: 'LOGIN_WATCHER', payload: authParams }
}
export function updateProfile(profile) {
  return { type: 'UPDATE_PROFILE', payload: profile }
}
export function setLoggingIn() {
  return { type: 'SET_LOGGING_IN' }
}
export function countWatcher(token, count) {
  return { type: 'COUNT_WATCHER', payload: { count, token }}
}
export function updateCount(count) {
  return { type: 'UPDATE_COUNT', payload: count }
}