import { render } from '@testing-library/svelte'
import Spinner from '@/components/common/Spinner.svelte'

describe('Spinner.svelte', () => {
  it('should render correctly', () => {
    const { container } = render(Spinner, {
      props: {
        size: 23,
        width: 2
      }
    })
    const spinner = container.querySelector('.spinner')
    expect(spinner).toBeInTheDocument()
  })
})
