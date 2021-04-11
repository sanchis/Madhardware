import SearchProduct from 'components/SearchProduct'
import { render } from '../../utils'

describe('SearchProduct component', () => {
  const productNotFoundText = 'Producto no encontrado 😔'

  test('should be product not found', async () => {
    const fakePromise = () => new Promise((resolve, reject) => resolve(null))
    const headerText = 'test'

    const { getByText, findByText } = render(<SearchProduct searchService={fakePromise} headerText={headerText} />)
    const headerNotFound = await findByText(productNotFoundText)
    const headerProduct = getByText(headerText)

    expect(headerNotFound).toBeInTheDocument()
    expect(headerProduct).toBeInTheDocument()
    expect(headerProduct.innerHTML).toBe(headerText)
  })

  test('should be product info', async () => {
    const fakePromise = () => new Promise((resolve, reject) => resolve({
      price: parseFloat(2),
      name: 'Test name',
      url: '',
      description: '',
      image: 'https://via.placeholder.com/150'
    }))
    const headerText = 'test'

    const { getByText, findByTestId } = render(<SearchProduct searchService={fakePromise} headerText={headerText} />)
    const headerProduct = getByText(headerText)
    const cardProduct = await findByTestId('card')

    expect(headerProduct).toBeInTheDocument()
    expect(headerProduct.innerHTML).toBe(headerText)
    expect(cardProduct).toBeInTheDocument()
  })

  test('should be product error', async () => {
    const fakePromise = () => new Promise((resolve, reject) => reject(new Error()))
    const headerText = 'test'

    const { getByText, findByText } = render(<SearchProduct searchService={fakePromise} headerText={headerText} />)
    const headerNotFound = await findByText(productNotFoundText)
    const headerProduct = getByText(headerText)

    expect(headerNotFound).toBeInTheDocument()
    expect(headerProduct).toBeInTheDocument()
    expect(headerProduct.innerHTML).toBe(headerText)
  })
})
