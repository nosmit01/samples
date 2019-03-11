import Vue from 'vue'
import Vuex from 'vuex'

import routing from './modules/routing'
import projects from './modules/projects'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    routing,
    projects
  }
})
