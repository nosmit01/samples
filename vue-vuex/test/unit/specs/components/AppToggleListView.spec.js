import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import AppToggleListView from '@/components/AppToggleListView'

const localVue = createLocalVue()

localVue.use(VueRouter)
localVue.use(Vuex)

const router = new VueRouter({
  routes: [
    { name: 'projects', path: '/' }
  ]

})

describe('AppToggleListView.vue', () => {
  let actions, modules, store

  beforeEach(() => {
    actions = {
      setListView: jest.fn()
    }

    modules = {
      projects: {
        namespaced: true,
        actions
      }
    }

    store = new Vuex.Store({
      modules
    })
  })

  it('should show grid view', () => {
    const wrapper = mount(AppToggleListView, { store, router, localVue })
    const push = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.find('.grid').trigger('click')
    expect(actions.setListView).toBeCalled()
    expect(push).toBeCalledWith({
      'name': 'projects',
      'params': {},
      'path': '',
      'query': {'view': undefined},
      'replace': true
    })
  })

  it('should show list view', () => {
    const wrapper = mount(AppToggleListView, { store, router, localVue })
    const push = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.find('.list').trigger('click')
    expect(actions.setListView).toBeCalled()
    expect(push).toBeCalledWith({
      'name': 'projects',
      'params': {},
      'path': '',
      'query': {'view': 'list'},
      'replace': true
    })
  })
})