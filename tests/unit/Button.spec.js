import { render, fireEvent } from '@testing-library/svelte'
import { tick } from 'svelte'
import Button from '@/components/common/Button.svelte'
import { createSlots } from '../utils'

describe('Button.svelte', () => {
  it('should render correctly', async () => {
    const slot = document.createTextNode('Button text')
    const { container, component } = render(Button, {
      props: {
        variant: 'primary',
        href: '/',
        $$slots: createSlots({ default: [slot] }),
        $$scope: {}
      }
    })
    const button = container.querySelector('.button')
    expect(button.tagName).toBe('A')
    expect(button).toHaveClass('button_primary')
    expect(button).toHaveTextContent(slot.textContent)

    const onClick = jest.fn()
    component.$on('click', onClick)
    await fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent)

    component.$set({ loading: true })
    await tick()
    expect(button.querySelector('.spinner')).toBeInTheDocument()
  })
})
