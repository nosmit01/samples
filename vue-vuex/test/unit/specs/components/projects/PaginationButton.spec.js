import { mount } from '@vue/test-utils'
import PaginationButton from '@/components/projects/PaginationButton'

describe('PaginationButton.vue', () => {
  const wrapper = mount(PaginationButton, {
    propsData: {
      page: {'count': 36, 'has_next': true, page: 1}
    }
  })

  it('should show `show more` text', () => {
    expect(wrapper.contains('.show-more')).toBe(true)
  })

  it('should fetch more projects', () => {
    wrapper.trigger('click')
    expect(wrapper.emitted('next-page')).toBeTruthy()
  })
})