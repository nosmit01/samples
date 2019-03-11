import { truncate, pluralize, capitalize } from '@/filters'

describe('pluralize', () => {
  it('should return no ending if just one', () => {
    expect(pluralize(1)).toEqual('')
  })

  it('should return an ending if more than one', () => {
    expect(pluralize(2)).toEqual('s')
  })

  it('should handle custom ending', () => {
    expect(pluralize(2, 'ies')).toEqual('ies')
  })
})

describe('truncate', () => {
  it('should truncate a string to a max length', () => {
    expect(truncate('foobar', 3)).toEqual('...')
  })

  it('should not truncate if string too short', () => {
    expect(truncate('foobar', 9)).toEqual('foobar')
  })

  it('should just return an empty string if not defined', () => {
    expect(truncate(undefined, 3)).toEqual('')
  })
})

describe('capitalize', () => {
  it('should capitalize a string', () => {
    expect(capitalize('foobar')).toEqual('Foobar')
  })

  it('should capitalize every word in string ', () => {
    expect(capitalize('foo bar')).toEqual('Foo Bar')
  })

  it('should just return an empty string if not defined', () => {
    expect(capitalize(undefined)).toEqual('')
  })
})
