import { getters, mutations, actions } from '@/store/modules/projects'

describe('actions', () => {
  it('should fetch projects', async () => {
    const commit = jest.fn()
    const response = {
      page: {
        page: 1
      },
      results: [
        {
          id: 1
        }
      ]
    }
    await actions.fetchProjects({ commit }, 1)
    const { calls } = commit.mock
    expect(calls[0]).toEqual(['loading', {loading: true}])

    setTimeout(() => {
      expect(calls[1]).toEqual(['pageObj', {pageObj: response.page}])
      expect(calls[2]).toEqual(['projects', {projects: response.results}])
      expect(calls[3]).toEqual(['loading', {loading: false}])
    }, 2000)
  })
})

describe('mutations', () => {
  it('should clear all projects', () => {
    const state = { projects: [{ id: 1 }] }
    mutations.clearProjects(state)
    expect(state.projects).toEqual([])
  })
})

describe('getters', () => {
  it('should return a page object for projects', () => {
    const state = {
      pageObj: {
        results: [
          {
            id: 1
          },
          {
            id: 2
          }
        ]
      }
    }

    const pageObj = getters.pageObj(state)
    expect(pageObj.results.length).toEqual(2)
  })
})
