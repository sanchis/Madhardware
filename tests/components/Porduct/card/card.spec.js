import ProductCard from 'components/Product/card'
import { render } from '../../../utils'

describe('Product Card component', () => {
  test('should be product loading', async () => {
    const { queryAllByLabelText, getByLabelText } = render(<ProductCard loading='true' shopColor='#fff' />)
    const loadingIndicators = queryAllByLabelText('loading')
    const loadingProgress = getByLabelText('loading-progress')

    expect(loadingIndicators).toBeDefined()
    expect(loadingProgress).toBeDefined()
    expect(loadingProgress).toBeVisible()
    expect(loadingIndicators.length).toBe(4)
  })

  test('should be product info', async () => {
    const product = {
      price: parseFloat(2),
      name: 'Test name',
      url: '',
      description: '',
      img: 'https://via.placeholder.com/150'
    }
    const { getByLabelText, queryByLabelText } = render(<ProductCard shopColor='#fff' product={product} />)

    const productHeader = getByLabelText('product-header')
    const productImage = getByLabelText('product-image')
    const productDescription = getByLabelText('product-description')
    const productPrice = getByLabelText('product-price')
    const loadingProgress = queryByLabelText('loading-progress')

    expect(loadingProgress).toBeNull()
    expect(productHeader.innerHTML).toBe(product.name)
    expect(productImage.getAttribute('data-src')).toBe(product.img)
    expect(productDescription.innerHTML).toBe(product.description)
    expect(productPrice.innerHTML).toBe(`${product.price} €`)
  })
})
