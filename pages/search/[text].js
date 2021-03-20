import { Heading, SimpleGrid } from '@chakra-ui/react'
import ProductColor from 'components/product/card'
import { searchAlternate, searchCoolmod, searchPcc, searchXtremmedia } from 'services/parser.service'

export default function SearchResult ({ pcc, coolmod, xtremmedia, alternate }) {
  const notFound = () => <Heading textAlign='center' fontWeight='thin' fontSize='1xl'>Producto no encontrado 😔</Heading>

  return (
    <SimpleGrid columns={[1, 2, 3]} gap='10'>
      <div>
        <Heading textAlign='center' mb='5'>Pccomponentes</Heading>
        {pcc ? <ProductColor product={pcc} shopColor='orange.300' /> : notFound()}
      </div>
      <div>
        <Heading textAlign='center' mb='5'>Coolmod</Heading>
        {coolmod ? <ProductColor product={coolmod} shopColor='#333' /> : notFound()}
      </div>
      <div>
        <Heading textAlign='center' mb='5'>Xtremmedia</Heading>
        {xtremmedia ? <ProductColor product={xtremmedia} shopColor='#dfe42f' /> : notFound()}
      </div>
      <div>
        <Heading textAlign='center' mb='5'>Alternate</Heading>
        {alternate ? <ProductColor product={alternate} shopColor='#e30613' /> : notFound()}
      </div>
    </SimpleGrid>
  )
}

export async function getServerSideProps ({ query }) {
  const text = query.text
  if (!text || text.trim() === '') {
    return {
      props: {
        pcc: null
      }
    }
  }

  return {
    props: {
      pcc: await searchPcc(text),
      coolmod: await searchCoolmod(text),
      xtremmedia: await searchXtremmedia(text),
      alternate: await searchAlternate(text)
    }
  }
}
