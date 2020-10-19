import { render } from '@testing-library/svelte'
import { waitTransition, createSlots } from '../utils'
import { dispatchEvent } from '@/utils'
import Collapse from '@/components/common/Collapse.svelte'

describe('Collapse.svelte', () => {
  it('should render correctly', async () => {
    const slot = document.createElement('p')
    const { container } = render(Collapse, {
      props: {
        id: 'test',
        accordion: 'group',
        visible: true,
        $$slots: createSlots({ default: [slot] }),
        $$scope: {}
      }
    })
    expect(container).toContainElement(slot)

    dispatchEvent(window, 'collapse:accordion', {
      id: 'other',
      accordion: 'group'
    })
    await waitTransition(300)
    expect(container).not.toContainElement(slot)

    dispatchEvent(window, 'toggle:collapse', { id: 'test' })
    await waitTransition(300)
    expect(container).toContainElement(slot)
  })

  it('should dispatch correctly', async () => {
    const slot = document.createElement('p')
    const { container, component } = render(Collapse, {
      props: {
        id: 'test',
        accordion: 'group',
        visible: false,
        $$slots: createSlots({ default: [slot] }),
        $$scope: {}
      }
    })
    const onUpdate = jest.fn()
    const onCollapseUpdate = jest.fn()
    const onCollapseAccordion = jest.fn()
    const onOpen = jest.fn()
    const onOpened = jest.fn()
    const onClose = jest.fn()
    const onClosed = jest.fn()
    component.$on('update', onUpdate)
    component.$on('open', onOpen)
    component.$on('opened', onOpened)
    component.$on('close', onClose)
    component.$on('closed', onClosed)
    window.addEventListener('collapse:update', onCollapseUpdate)
    window.addEventListener('collapse:accordion', onCollapseAccordion)
    expect(container).not.toContainElement(slot)

    component.$set({ visible: true })
    await waitTransition(300)
    expect(container).toContainElement(slot)
    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate.mock.calls[0][0].detail).toBe(true)
    expect(onCollapseUpdate).toHaveBeenCalledTimes(1)
    expect(onCollapseUpdate.mock.calls[0][0].detail).toEqual({
      id: 'test',
      visible: true
    })
    expect(onCollapseAccordion).toHaveBeenCalledTimes(1)
    expect(onCollapseAccordion.mock.calls[0][0].detail).toEqual({
      id: 'test',
      accordion: 'group'
    })
    expect(onOpen).toHaveBeenCalled()
    expect(onOpened).toHaveBeenCalled()

    component.$set({ visible: false })
    await waitTransition(300)
    expect(container).not.toContainElement(slot)
    expect(onUpdate).toHaveBeenCalledTimes(2)
    expect(onUpdate.mock.calls[1][0].detail).toBe(false)
    expect(onCollapseUpdate).toHaveBeenCalledTimes(2)
    expect(onCollapseUpdate.mock.calls[1][0].detail).toEqual({
      id: 'test',
      visible: false
    })
    expect(onCollapseAccordion).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalled()
    expect(onClosed).toHaveBeenCalled()
  })
})
