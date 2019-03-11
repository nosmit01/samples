import Vue from 'vue'

const state = {
  loading: false
}

export const actions = {
  startLoading ({ commit }) {
    commit('loading', { loading: true })
  },
  stopLoading ({ commit }) {
    commit('loading', { loading: false })
  }
}

export const mutations = {
  loading (state, { loading }) {
    Vue.set(state, 'loading', loading)
  }
}

export const getters = {
  loading (state) {
    return state.loading
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
