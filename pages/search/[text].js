import { SimpleGrid } from '@chakra-ui/react'
import GenericSearcher from 'components/SearchProduct'
import { useRouter } from 'next/router'
import { searchAlternate, searchCoolmod, searchPcc, searchXtremmedia } from 'services/parser.service'

export default function SearchResult () {
  const { query, isReady } = useRouter()

  return (
    isReady
      ? (
        <SimpleGrid columns={[1, 2, 3]} gap='10'>
          <GenericSearcher headerText='Pccomponentes' shopColor='orange.300' searchService={() => searchPcc(query.text)} />
          <GenericSearcher headerText='Coolmod' shopColor='#333' searchService={() => searchCoolmod(query.text)} />
          <GenericSearcher headerText='Xtremmedia' shopColor='#dfe42f' searchService={() => searchXtremmedia(query.text)} />
          <GenericSearcher headerText='Alternate' shopColor='#e30613' searchService={() => searchAlternate(query.text)} />
        </SimpleGrid>
        )
      : null
  )
}
