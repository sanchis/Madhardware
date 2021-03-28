import Index from 'pages/index'
import { render, fireEvent } from '../utils'
import { useRouter } from 'next/router'

jest.mock('next/router')
describe('Index Page', () => {
  let expectedRouterPush

  beforeEach(() => {
    expectedRouterPush = jest.fn()
    useRouter.mockReturnValue({ push: expectedRouterPush })
  })

  test('should be searchProduct', async () => {
    const searchText = 'test'

    const { getByTestId } = render(<Index />)
    const searchInput = getByTestId('searchInput')
    const searchForm = getByTestId('searchForm')

    fireEvent.change(searchInput, { target: { value: searchText } })
    fireEvent.submit(searchForm)

    expect(searchForm).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(searchInput.getAttribute('value')).toBe(searchText)

    expect(expectedRouterPush).toHaveBeenCalledTimes(1)
    expect(expectedRouterPush).toHaveBeenCalledWith(`search/${searchText}`)
  })

  test('should be searchProduct empty', async () => {
    const searchText = ''

    const { getByTestId } = render(<Index />)
    const searchInput = getByTestId('searchInput')
    const searchForm = getByTestId('searchForm')

    fireEvent.change(searchInput, { target: { value: searchText } })
    fireEvent.submit(searchForm)

    expect(searchForm).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(searchInput.getAttribute('value')).toBe(searchText)

    expect(expectedRouterPush).toHaveBeenCalledTimes(0)
  })
})
