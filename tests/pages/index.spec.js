import Index from 'pages/index'
import { render, fireEvent } from '../utils'
import { useRouter } from 'next/router'

jest.mock('next/router')
describe('Index Page', () => {
  let expectedRouterPush
  let searchInput

  beforeEach(() => {
    expectedRouterPush = jest.fn()
    useRouter.mockReturnValue({ push: expectedRouterPush })

    const { getByPlaceholderText } = render(<Index />)
    searchInput = getByPlaceholderText('Introduce el nombre del producto')
  })

  test('should be searchProduct', async () => {
    const searchText = 'test'

    fireEvent.change(searchInput, { target: { value: searchText } })
    fireEvent.submit(searchInput)

    expect(searchInput).toBeInTheDocument()
    expect(searchInput.getAttribute('value')).toBe(searchText)

    expect(expectedRouterPush).toHaveBeenCalledTimes(1)
    expect(expectedRouterPush).toHaveBeenCalledWith(`search/${searchText}`)
  })

  test('should be searchProduct empty', async () => {
    const searchText = ''

    fireEvent.change(searchInput, { target: { value: searchText } })
    fireEvent.submit(searchInput)

    expect(searchInput).toBeInTheDocument()
    expect(searchInput.getAttribute('value')).toBe(searchText)

    expect(expectedRouterPush).toHaveBeenCalledTimes(0)
  })
})
