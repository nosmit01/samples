import Vue from 'vue'
import projectList from '../../../__mocks__/projectList'
import projectDetail from '../../../__mocks__/projectDetail'
import uniqBy from 'lodash/uniqBy'

const state = {
  projects: [],
  loading: false,
  loadingNextPage: false,
  pageObj: null,
  projectDetail: null,
  projectNotFound: false,
  isListView: false
}

export const actions = {
  async fetchProject ({ commit }, { id }) {
    commit('loading', { loading: true })
    commit('projectNotFound', { projectNotFound: false })
    commit('projectDetail', { projectDetail: null })
    try {
      setTimeout(() => {
        const response = projectDetail[id]
        commit('projectDetail', { projectDetail: response })
        commit('loading', { loading: false })
      }, 2000)
    } catch (e) {
      commit('loading', { loading: false })
      commit('projectNotFound', { projectNotFound: true })
    }
  },
  fetchProjects ({ commit }, page) {
    commit('loading', { loading: true })
    if (!page || page === 1) {
      commit('clearProjects')
    }
    if (page > 1) {
      commit('loadingNextPage', { loadingNextPage: true })
    }
    try {
      setTimeout(() => {
        const response = projectList[page]
        commit('pageObj', { pageObj: response.page })
        commit('projects', { projects: response.results })
        commit('loading', { loading: false })
        commit('loadingNextPage', { loadingNextPage: false })
      }, 2000)
    } catch (e) {
      commit('loading', { loading: false })
    }
  },
  setListView ({ commit }, isListView) {
    sessionStorage.setItem('isListView', isListView)
    localStorage.setItem('list-view-dot', true)
    commit('setListView', { view: isListView })
  }
}

export const mutations = {
  loading (state, { loading }) {
    state.loading = loading
  },
  loadingNextPage (state, { loadingNextPage }) {
    state.loadingNextPage = loadingNextPage
  },
  pageObj (state, { pageObj }) {
    Vue.set(state, 'pageObj', pageObj)
  },
  projectDetail (state, { projectDetail }) {
    Vue.set(state, 'projectDetail', projectDetail)
  },
  projectNotFound (state, { projectNotFound }) {
    Vue.set(state, 'projectNotFound', projectNotFound)
  },
  projects (state, { projects }) {
    Vue.set(state, 'projects', [...state.projects, ...projects])
    Vue.set(state, 'projectDetail', null)
  },
  clearProjects (state) {
    Vue.set(state, 'projects', [])
  },
  setListView (state, { view }) {
    Vue.set(state, 'isListView', view)
  }
}

export const getters = {
  loading (state) {
    return state.loading
  },
  loadingNextPage (state) {
    return state.loadingNextPage
  },
  projectDetail (state) {
    return state.projectDetail
  },
  projectNotFound (state) {
    return state.projectNotFound
  },
  projects (state) {
    return uniqBy(state.projects, 'id')
  },
  pageObj (state) {
    return state.pageObj
  },
  isListView (state) {
    return state.isListView
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
