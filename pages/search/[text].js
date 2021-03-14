import { Heading, SimpleGrid } from '@chakra-ui/react'
import { PccomponentesCard } from 'components/product/card/pcc'
import { searchPcc } from 'services/parser.service'

export default function SearchResult ({ pcc }) {
  const notFound = () => <Heading textAlign='center' fontWeight='thin' fontSize='1xl'>Producto no encontrado 😔</Heading>

  return (
    <SimpleGrid columns={[1, 2, 3]} gap='10'>
      <div>
        <Heading textAlign='center' mb='5'>Pccomponentes</Heading>
        {pcc ? <PccomponentesCard product={pcc} /> : notFound()}
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
      pcc: await searchPcc(text)
    }
  }
}
