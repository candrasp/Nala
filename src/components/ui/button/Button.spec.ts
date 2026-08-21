import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button component', () => {
  it('renders default slot content correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me',
      },
    })
    expect(wrapper.text()).toBe('Click Me')
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('applies default variant and size attributes', () => {
    const wrapper = mount(Button)
    expect(wrapper.attributes('data-slot')).toBe('button')
  })

  it('applies custom variant classes properly', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'destructive',
      },
    })
    expect(wrapper.attributes('data-variant')).toBe('destructive')
    expect(wrapper.classes()).toContain('bg-destructive')
  })

  it('applies custom classes passed via props', () => {
    const wrapper = mount(Button, {
      props: {
        class: 'custom-test-class',
      },
    })
    expect(wrapper.classes()).toContain('custom-test-class')
  })

  it('triggers click event when clicked', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
