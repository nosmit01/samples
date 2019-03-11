import _truncate from 'lodash/truncate'
import _startCase from 'lodash/startCase'
import _toLower from 'lodash/toLower'

export function pluralize (count, plural = 's') {
  if (count === 1) {
    return ''
  }
  return plural
}

export function truncate (string, max) {
  return _truncate(string, { length: max })
}

export function capitalize (string) {
  return _startCase(_toLower(string))
}
