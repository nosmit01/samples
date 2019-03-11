import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import ProjectRow from '@/components/projects/ProjectRow'

const localVue = createLocalVue()

localVue.use(VueRouter)
localVue.use(Vuex)

const router = new VueRouter({
  routes: [
    { name: 'details', path: '/details/:id/' }
  ]

})
const project = {
  "id": 31,
  "category": "Finance",
  "name": "dolor nisi",
  "timeframe": "1 - 4 weeks"
}

describe('ProjectRow.vue', () => {
  const wrapper = mount(ProjectRow, { router, localVue, propsData: { project } })

  it('should render project card and data', () => {
    expect(wrapper.find('h4').text()).toContain("Dolor Nisi")
    expect(wrapper.find('.category').text()).toContain("Finance")
    expect(wrapper.find('.timeframe').text()).toContain("1 - 4 weeks")
  })

  it('should route to project detail page', () => {
    const push = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.showDetails()
    expect(push).toBeCalledWith({
      name: 'details',
      params: { id: 31 },
      path: '/details/31'
    })
  })
})

