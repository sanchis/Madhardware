import { Heading } from '@chakra-ui/layout'
import { useState, useEffect } from 'react'
import ProductCard from 'components/Product/card'

export default function SearchProduct ({ searchService, headerText, shopColor }) {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(undefined)

  useEffect(() => {
    setLoading(true)
    searchService()
      .then(product => setProduct(product))
      .catch(() => setProduct(null))
      .finally(setLoading(false))
  }, [])

  return (
    <div>
      <Heading textAlign='center' mb='5'>{headerText}</Heading>
      {product === null
        ? <Heading textAlign='center' fontWeight='thin' fontSize='1xl'>Producto no encontrado 😔</Heading>
        : <ProductCard product={product} loading={loading} shopColor={shopColor} />}
    </div>
  )
}
