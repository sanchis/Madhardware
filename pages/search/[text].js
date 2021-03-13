import { PccomponentesCard } from 'components/product/card/pcc'
import { searchPcc } from 'services/parser.service'

export default function SearchResult ({ pcc }) {
  return (
    <>
      <h2>Pccomponentes</h2>
      {pcc ? <PccomponentesCard product={pcc} /> : <p>Producto no encontrado</p>}
    </>
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
